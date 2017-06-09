import { createSelector } from 'reselect';

import { getApiStatus as getState } from './rootSelectors';

export const isFetching = createSelector(
  getState,
  state => state.callCounter > 0
);

export const getError = createSelector(
  getState,
  state => state.error
);
