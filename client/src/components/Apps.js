import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getApps } from '../actions/apps';
import SingleApp from './SingleApp';
import Loader from './layout/Loader';

const Apps = ({ apps, loading, getApps, currentApp = 'none' }) => {
  useEffect(() => {
    apps === null && getApps();
  }, [getApps, apps]);

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <div className='w3-row w3-padding-16 w3-round' style={{ backgroundColor: 'lightgrey', height: '100vh' }}>
        {apps.map(app => app.name !== currentApp && <SingleApp app={app} key={app.name} />)}{' '}
      </div>
    </Fragment>
  );
};

Apps.propTypes = {
  getApps: PropTypes.func.isRequired,
  apps: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  apps: state.appsData.apps,
  loading: state.appsData.loading
});

export default connect(
  mapStateToProps,
  { getApps }
)(Apps);
