import { createSelector } from 'reselect';

import { getPagination as getState } from './rootSelectors';
import { getRepos, getUsers } from './entityRepositorySelectors';

export const getStarredReposByUser = createSelector(
  getState,
  state => state.starredByUsers
);

export const getStargazers = createSelector(
  getState,
  state => state.stargazers
);

export const getStarredReposByUserRepos = createSelector(
  getStarredReposByUser,
  getRepos,
  (starredByUsers, repos) => {
    if (starredByUsers) {
      return starredByUsers
        .ids
        .map(repoId => repos[repoId]);
    }

    return [];
  }
);

export const getStargazersUsers = createSelector(
  getStargazers,
  getUsers,
  (stargazers, users) => {
    if (stargazers) {
      return stargazers
        .ids
        .map(userId => users[userId]);
    }

    return [];
  }
);
