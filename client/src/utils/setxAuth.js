import axios from 'axios';

const setxAuth = () => {
  axios.defaults.headers.common['xauth'] = 'temp';
};

export default setxAuth;
