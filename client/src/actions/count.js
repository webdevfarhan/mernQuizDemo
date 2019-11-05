import { SET_COUNT } from './types';

//count how many result user have seen
export const countIncrement = (count, done = false) => async dispatch => {
  let result = {
    count,
    done
  };
  try {
    dispatch({
      type: SET_COUNT,
      payload: result
    });
  } catch (error) {
    console.log('error : ', error);
  }
};
