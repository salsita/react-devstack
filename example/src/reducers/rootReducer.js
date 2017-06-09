import { combineReducers } from 'redux';

import apiStatus from './apiStatusReducer';
import explore from './exploreReducer';
import entityRepository from './entityRepositoryReducer';
import pagination from './paginationReducer';

export default combineReducers({
  apiStatus,
  explore,
  entityRepository,
  pagination
});
