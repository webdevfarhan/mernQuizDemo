import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const SingleApp = ({ app: { imgUrl, title, name }, history, app }) => {
  const goToUserDetails = () => {
    history.push({
      pathname: `/user-details/${name}`,
      app
    });
  };

  return (
    <div className='w3-col s12 m12 l4 w3-padding handPointer' style={{ backgroundColor: 'lightgrey' }} onClick={() => goToUserDetails()}>
      <img className='w3-col s12 m12 w3-round' alt={name} src={imgUrl} />
      <div className='w3-container w3-white w3-col s12 m12 w3-center w3-round'>
        <p>{title}</p>
        <button className='w3-btn w3-teal w3-round w3-margin-bottom'>Play</button>
      </div>
    </div>
  );
};

SingleApp.propTypes = {
  app: PropTypes.object.isRequired
};

export default withRouter(SingleApp);
