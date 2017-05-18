import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

export default root => combineReducers({
  root,
  router: router5Reducer
});
