import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  callCounter: 0,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOADING_STARTED:
      return {
        ...state,
        callCounter: state.callCounter + 1,
        error: null
      };

    case ActionTypes.LOADING_FINISHED:
      return {
        ...state,
        callCounter: state.callCounter - 1
      };

    case ActionTypes.LOADING_FAILED:
      return {
        ...state,
        error: payload
      };

    case ActionTypes.DISMISS_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
