import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Apps from '../Apps';
import UserDetails from '../UserDetails';
import Result from '../Result';
import terms from '../terms';
import Navbar from '../layout/Navbar';
import AboutUs from '../AboutUs';

const Routes = () => {
  return (
    <Fragment>
      <Navbar />
      <div className='' style={{ height: '100%' }}>
        <Switch>
          <Route exact path='/' component={Apps} />
          <Route exact path='/terms' component={terms} />
          <Route exact path='/aboutus' component={AboutUs} />
          <Route exact path='/user-details/:appname' component={UserDetails} />
          <Route exact path='/result/:appname/:resultImage' component={Result} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Routes;
