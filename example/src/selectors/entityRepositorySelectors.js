import { createSelector } from 'reselect';

import { getEntityRepository as getState } from './rootSelectors';

export const getUsers = createSelector(
  getState,
  state => state.users
);

export const getRepos = createSelector(
  getState,
  getUsers,
  (state, users) => Object
    .keys(state.repos)
    .reduce((acc, repoId) => Object.assign({}, acc, {
      [repoId]: Object.assign({}, state.repos[repoId], {
        owner: users[state.repos[repoId].owner]
      })
    }), {})
);
