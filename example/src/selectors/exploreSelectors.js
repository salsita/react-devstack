import { createSelector } from 'reselect';

import { getExplore as getState } from './rootSelectors';

export const getValue = createSelector(
  getState,
  state => state.value
);
