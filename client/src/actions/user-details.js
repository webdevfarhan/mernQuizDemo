import axios from 'axios';
import serverUrl from '../utils/serverUrl';
import { GET_RESULT_IMAGE, SET_USER_DETAILS, SET_BASE64_DP } from './types.js';

export const getResultImage = (details, savedDetails) => async dispatch => {
  try {
    const res = await axios.post(`${serverUrl}/api/user/user-details`, details);
    const resultImage = res.data.imageName;
    const appname = res.data.appname;
    const result = {
      resultImage,
      appname
    };
    dispatch({ type: SET_USER_DETAILS, payload: savedDetails });
    dispatch({ type: GET_RESULT_IMAGE, payload: result });
  } catch (error) {
    console.log('error : ', error.message);
  }
};

export const setUserDetails = details => async dispatch => {
  dispatch({ type: SET_USER_DETAILS, payload: details });
};

export const setBase64Dp = dp => async dispatch => {
  dispatch({ type: SET_BASE64_DP, payload: dp });
};
