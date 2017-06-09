import merge from 'lodash/merge';

import * as ActionTypes from '../constants/actionTypes';

export default (state = { users: {}, repos: {} }, { type, payload }) => {
  switch (type) {
    case ActionTypes.ENTITY_REPO_HAS_CHANGED:
      return merge({}, state, payload);

    default:
      return state;
  }
};
