let serverUrl;
process.env.REACT_APP_SERVER_URL === 'localhost' ? (serverUrl = 'http://localhost:5001') : (serverUrl = 'https://test.appslel.com');
export default serverUrl;
