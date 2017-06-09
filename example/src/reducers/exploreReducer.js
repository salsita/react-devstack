import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  value: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.EXPLORE_CHANGE_FIELD:
      return {
        ...state,
        value: payload
      };

    default:
      return state;
  }
};
