import union from 'lodash/union';
import * as ActionTypes from '../constants/actionTypes';

const initialState = {};

const updatePagination = (state = {
  nextPageUrl: undefined,
  pageCount: 0,
  ids: []
}, { payload: { nextPageUrl, result } }) => Object.assign({}, state, {
  pageCount: state.pageCount + 1,
  nextPageUrl,
  ids: union(state.ids, result)
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESET_PAGINATION_STATE:
      return initialState;

    case ActionTypes.STARRED_FETCHED:
      return Object.assign({}, state, {
        starredByUsers: updatePagination(state.starredByUsers, action)
      });
    
    case ActionTypes.STARGAZERS_FETCHED:
      return Object.assign({}, state, {
        stargazers: updatePagination(state.stargazers, action)
      });

    default:
      return state;
  }
};
