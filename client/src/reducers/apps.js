import { GET_APPS } from '../actions/types';

const initialState = {
  loading: true,
  apps: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_APPS:
      return {
        ...state,
        apps: payload,
        loading: false
      };
    default:
      return state;
  }
}
