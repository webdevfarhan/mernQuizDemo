import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Resizer from 'react-image-file-resizer';

import { setBase64Dp } from '../actions/user-details';
import { getResultImage } from '../actions/user-details';
import { countIncrement } from '../actions/count';
import { dataURLtoFile } from '../utils/functions';
import defaultDp from '../utils/defaultDp';
import Loader from './layout/Loader';
import { getApps } from '../actions/apps';

const UserDetails = ({
  match,
  setBase64Dp,
  base64Dp,
  savedDetails,
  getResultImage,
  resultImage,
  count,
  countIncrement,
  done,
  apps,
  title = '',
  getApps,
  match: {
    params: { appname }
  }
}) => {
  apps === null && getApps();
  if (apps !== null) {
    apps.forEach(app => {
      if (app.name === appname) {
        title = app.title;
      }
    });
  }
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: savedDetails ? savedDetails.name : 'Your Name',
    appname: match.params.appname,
    dp: base64Dp ? dataURLtoFile(base64Dp, 'dp.jpeg') : dataURLtoFile(defaultDp, 'dp.jpeg'),
    gender: savedDetails ? savedDetails.gender : 'male'
  });

  const onChange = (e, image = 0) => {
    let file;
    if (image === 1) {
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        250,
        'JPEG',
        80,
        0,
        uri => {
          setBase64Dp(uri);
          file = dataURLtoFile(uri, 'dp.jpeg');
          setFormData({ ...formData, dp: file });
        },
        'base64'
      );
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const renderRedirect = () => {
    if (redirect === true) {
      return (
        <Redirect
          to={{
            pathname: `/result/${match.params.appname}/${resultImage}`
          }}
        />
      );
    }
  };

  const getResult = async () => {
    let userDetails = new FormData();
    userDetails.set('name', formData.name);
    userDetails.set('appname', formData.appname);
    userDetails.set('gender', formData.gender);
    userDetails.set('dp', formData.dp);
    await getResultImage(userDetails, formData);
    setRedirect(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    countIncrement(++count, done);
    setLoading(true);
    getResult();
  };

  const rotate = e => {
    e.preventDefault();
    let file;
    Resizer.imageFileResizer(
      formData.dp,
      300,
      250,
      'JPEG',
      80,
      90,
      uri => {
        setBase64Dp(uri);
        file = dataURLtoFile(uri, 'dp.jpeg');
        setFormData({ ...formData, dp: file });
      },
      'base64'
    );
  };

  return (
    <div>
      {renderRedirect()}
      <h3 className='w3-center'>{title}</h3>
      {loading ? (
        <Loader />
      ) : (
        <form className='w3-container w3-center' onSubmit={e => onSubmit(e)}>
          <div>
            <label>
              <b>1. Name</b>
            </label>
            <input
              required
              onChange={e => onChange(e)}
              style={{ maxWidth: '250px', borderRadius: '5px', margin: 'auto' }}
              className='w3-input w3-border'
              name='name'
              type='text'
              value={formData.name}
            />
          </div>
          <div className='w3-margin'>
            <div>
              <label>
                <b>2. Gender</b>
              </label>
            </div>
            <input className='w3-radio' type='radio' name='gender' value='male' onChange={e => onChange(e)} checked={formData.gender === 'male'} required />
            <label>Male</label>
            <input className='w3-radio w3-margin-left' type='radio' name='gender' onChange={e => onChange(e)} value='female' checked={formData.gender === 'female'} />
            <label>Female</label>
          </div>
          <div>
            <label>
              <b>3. Profile Picture</b>
            </label>
            <div style={{ height: '100%', width: 300, border: '1px solid grey', borderWidth: 2, borderRadius: 5, margin: '0 auto' }}>
              <input
                style={{ width: 300, display: 'block' }}
                onChange={e => e.target.files.length > 0 && onChange(e, 1)}
                className='w3-input'
                type='file'
                accept='image/gif, image/jpeg, image/png'
                name='dp'
                id='dp'
              />
            </div>
            <div className='w3-container w3-center'>
              {base64Dp && (
                <button className='w3-btn w3-green w3-round w3-margin' onClick={e => rotate(e)}>
                  Rotate ?
                </button>
              )}
            </div>
          </div>

          {base64Dp && (
            <div className='w3-center w3-col'>
              <img src={base64Dp} alt='' className='w3-round' height='180px' width='180px' />
            </div>
          )}

          <button className='w3-button w3-teal w3-round w3-xlarge w3-margin rotate-center'>Find Out</button>
        </form>
      )}
    </div>
  );
};

UserDetails.propTypes = {
  resultImage: PropTypes.string,
  appname: PropTypes.string,
  savedDetails: PropTypes.object,
  base64Dp: PropTypes.string,
  getResultImage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  countIncrement: PropTypes.func,
  done: PropTypes.bool.isRequired,
  apps: PropTypes.array,
  getApps: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    resultImage: state.userDetailsData.resultImage,
    appname: state.userDetailsData.appname,
    savedDetails: state.userDetailsData.savedDetails,
    base64Dp: state.userDetailsData.base64Dp,
    count: state.countData.count,
    done: state.countData.done,
    apps: state.appsData.apps
  };
};

export default connect(
  mapStateToProps,
  { setBase64Dp, getResultImage, countIncrement, getApps }
)(UserDetails);
