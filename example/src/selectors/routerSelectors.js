import { Selectors } from 'react-devstack';
import { createSelector } from 'reselect';

import { getRepos, getUsers } from './entityRepositorySelectors';

export const getUsername = createSelector(
  Selectors.getRoute,
  route => route.params.username.toLowerCase()
);

export const getRepoName = createSelector(
  Selectors.getRoute,
  route => route.params.repo.toLowerCase()
);

export const getUser = createSelector(
  getUsername,
  getUsers,
  (username, users) => users[username]
);

export const getRepoFullName = createSelector(
  getUsername,
  getRepoName,
  (username, reponame) => `${username}/${reponame}`
);

export const getRepo = createSelector(
  getRepoFullName,
  getRepos,
  (repoFullName, repos) => repos[repoFullName]
);
