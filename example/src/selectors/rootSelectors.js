import { Selectors } from 'react-devstack';
import { createSelector } from 'reselect';

export const getApiStatus = createSelector(
  Selectors.getRootState,
  state => state.apiStatus
);

export const getExplore = createSelector(
  Selectors.getRootState,
  state => state.explore
);

export const getPagination = createSelector(
  Selectors.getRootState,
  state => state.pagination
);

export const getEntityRepository = createSelector(
  Selectors.getRootState,
  state => state.entityRepository
);
