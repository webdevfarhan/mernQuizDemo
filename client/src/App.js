import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { hotjar } from 'react-hotjar';
import { createBrowserHistory } from 'history';
import store from './store';
import Routes from './components/routing/Routes';
import './App.css';
import setxAuth from './utils/setxAuth';
setxAuth();

const history = createBrowserHistory();
const trackingId = 'UA-146647056-1'; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
hotjar.initialize(1458423, 6);

history.listen(location => {
  if (location.pathname.indexOf('result') === -1) {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
    document.title = 'Fun Apps';
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
