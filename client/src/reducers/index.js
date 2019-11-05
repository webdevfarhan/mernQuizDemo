import { combineReducers } from 'redux';
import apps from './apps';
import userDetails from './user-details';
import count from './count';

export default combineReducers({
  appsData: apps,
  userDetailsData: userDetails,
  countData: count
});
