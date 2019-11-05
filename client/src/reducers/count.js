import { SET_COUNT } from '../actions/types';

const initialState = {
  count: 0,
  done: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_COUNT:
      return {
        ...initialState,
        count: payload.count,
        done: payload.done
      };
    default:
      return state;
  }
}
