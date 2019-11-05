import { GET_RESULT_IMAGE, SET_USER_DETAILS, SET_BASE64_DP } from '../actions/types';

const initialState = {
  loading: false
};
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RESULT_IMAGE:
      return {
        ...state,
        resultImage: payload.resultImage,
        appname: payload.appname
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        savedDetails: payload
      };
    case SET_BASE64_DP:
      return {
        ...state,
        base64Dp: payload
      };
    default:
      return state;
  }
}
