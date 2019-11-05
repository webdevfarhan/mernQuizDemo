import axios from 'axios';
import { GET_APPS } from './types';
import serverUrl from '../utils/serverUrl';

//get apps
export const getApps = () => async dispatch => {
  try {
    const res = await axios.get(`${serverUrl}/apps`);
    dispatch({
      type: GET_APPS,
      payload: res.data
    });
  } catch (error) {
    console.log('error : ', error);
  }
};
