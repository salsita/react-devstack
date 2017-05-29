import fetch from 'isomorphic-fetch';
import { camelizeKeys } from 'humps';
import { normalize, schema } from 'normalizr';

const API_ROOT = 'https://api.github.com';

const buildApiUrl = (endpoint) => {
  if (~endpoint.indexOf(API_ROOT)) {
    return endpoint;
  }

  return API_ROOT + endpoint;
};

const userSchema = new schema.Entity('users', {}, {
  idAttribute: user => user.login.toLowerCase()
});

const repoSchema = new schema.Entity('repos', {
  owner: userSchema
}, {
  idAttribute: repo => repo.fullName.toLowerCase()
});

// Schemas for Github API responses.
const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  REPO: repoSchema,
  REPO_ARRAY: [repoSchema]
};

// Extracts the next page URL from Github API response.
const getNextPageUrl = (response) => {
  const link = response.headers.get('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
};

const handleGithubResponse = entitySchema => response => response.json().then((json) => {
  if (!response.ok) {
    return Promise.reject(json);
  }

  const camelizedJson = camelizeKeys(json);
  const nextPageUrl = getNextPageUrl(response);

  return Object.assign({},
    normalize(camelizedJson, entitySchema),
    { nextPageUrl }
  );
});

export const fetchUser = login => fetch(buildApiUrl(`/users/${login}`))
  .then(handleGithubResponse(Schemas.USER));

export const fetchRepo = repoFullName => fetch(buildApiUrl(`/repos/${repoFullName}`))
  .then(handleGithubResponse(Schemas.REPO));

export const fetchStarred = (login, nextPageUrl = `/users/${login}/starred`) => fetch(buildApiUrl(nextPageUrl))
  .then(handleGithubResponse(Schemas.REPO_ARRAY));

export const fetchStargazers = (repoFullName, nextPageUrl = `/repos/${repoFullName}/stargazers`) => fetch(buildApiUrl(nextPageUrl))
  .then(handleGithubResponse(Schemas.USER_ARRAY));
