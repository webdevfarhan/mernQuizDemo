let serverUrl;
process.env.REACT_APP_SERVER_URL === 'localhost' ? (serverUrl = 'http://localhost:5000') : (serverUrl = 'https://appslel.com');
export default serverUrl;
