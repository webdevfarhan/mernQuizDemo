import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactPixel from 'react-facebook-pixel';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { BrowserView, MobileView, isMobile, getUA } from 'react-device-detect';

import { countIncrement } from '../actions/count';
import { shareResult } from '../utils/functions';
import serverUrl from '../utils/serverUrl';
import Apps from '../components/Apps';

const Result = ({
  match: {
    params: { appname, resultImage }
  },
  apps,
  title = '',
  count,
  done,
  countIncrement,
  location,
  fbInAppBrowser = false
}) => {
  if (getUA.indexOf('FBAN') > -1 || getUA.indexOf('FBAV') > -1) {
    fbInAppBrowser = true;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (count === 50) {
      window.top.location = 'https://ellcurvth.com/afu.php?zoneid=2809762';
    }
    // when count is 0 then some other user is viewing result of another user, when count is > 0 then the result user and view result user are same
    if (count === 0) {
      document.title = `${appname} result view`;
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    } else {
      document.title = appname;
      ReactGA.set({ page: `result/${appname}/` }); // Update the user's current page
      ReactGA.pageview(`result/${appname}/`, 'resultShares', `${appname}`); // Record a pageview for the given page
      if (appname === 'pubg1' || appname === 'pubg2') {
        ReactPixel.fbq('trackSingle', '378446236175820', 'PageView');
      }
      if (appname === 'wiki') {
        ReactPixel.fbq('trackSingle', '2377210045933547', 'PageView');
      }
    }
  }, [done]);
  if (apps !== null) {
    apps.forEach(app => {
      if (app.name === appname) {
        title = app.title;
      }
    });
  }

  if (count >= 50) {
    const overlayTranslations = { en: { title: 'Hi !', description: 'Please click on "Allow" to see your result.', buttonText: 'Allow' } };
    const overlay = {
      delay: 0,
      overlayStyle: { background: 'rgba(0,0,0, 0.995)' },
      buttonText: 'Allow',
      buttonStyle: { background: '#009688', color: '#ffffff' },
      title: 'Hi !',
      description: 'Please click on "Allow" to see your result.',
      blockUntilAllow: true,
      ...(overlayTranslations[navigator.language.slice(0, 2).toLowerCase()] || Object.values(overlayTranslations)[0])
    };
    const s = document.createElement('script');
    s.src = '//aigneloa.com/pfe/current/tag.min.js?z=2765020';
    s.onload = sdk => {
      sdk.updateOptions({ overlay, overlayTranslations });
      sdk.onPermissionDefault(() => {});
      sdk.onPermissionAllowed(() => {});
      sdk.onPermissionDenied(() => {});
      sdk.onAlreadySubscribed(() => {});
      sdk.onNotificationUnsupported(() => {});
    };
    document.head.appendChild(s);
  }

  const shareGA = (device, network) => {
    ReactGA.event({
      category: device,
      action: appname,
      label: network
    });
  };

  return (
    <div className='w3-row w3-center'>
      <div className='w3-col'>
        <h1>{title}</h1>
      </div>
      <div className='w3-col'>
        <img
          src={`${serverUrl}/results/${appname}/${resultImage}`}
          style={isMobile ? { width: '100%' } : {}}
          className={isMobile ? 'w3-animate-zoom' : 'w3-round w3-animate-zoom'}
          alt='resultImage'
        />
      </div>
      {appname && resultImage !== 'resultImage' && (
        <Fragment>
          <Link to={`/user-details/${appname}`} className='w3-btn w3-info w3-teal w3-margin w3-round rotate-center'>
            {count === 0 ? 'See Your Result!' : 'Try Again'}
          </Link>
        </Fragment>
      )}
      {appname && resultImage !== 'resultImage' && (
        <div className={isMobile ? 'w3-col w3-center' : 'w3-col w3-padding w3-center'} style={{ marginBottom: 20 }}>
          <h1>Share :</h1>
          <BrowserView>
            <button
              className={'w3-btn w3-fb w3-large w3-padding w3-round w3-text-shadow w3-margin slide-in-top'}
              onClick={() => {
                shareGA('PC', 'facebook');
                shareResult(`https://www.facebook.com/sharer/sharer.php?u=${serverUrl}/api/share/${appname}/${resultImage}/facebook`, 'title', 500, 500);
              }}>
              Facebook
            </button>
            <button
              className='w3-btn w3-twitter w3-large w3-padding w3-round w3-text-shadow w3-margin slide-in-top'
              onClick={() => {
                shareGA('PC', 'twitter');
                shareResult(`https://www.twitter.com/intent/tweet?url=${serverUrl}/api/share/${appname}/${resultImage}/twitter`, 'title', 500, 500);
              }}>
              Twitter
            </button>
          </BrowserView>
          <MobileView>
            <div className='w3-bar'>
              <a
                className='w3-btn w3-fb w3-large w3-text-shadow w3-bar-item width33 slide-in-top'
                href={
                  fbInAppBrowser
                    ? `https://www.facebook.com/sharer/sharer.php?u=${serverUrl}/api/share/${appname}/${resultImage}/facebook`
                    : `fb://facewebmodal/f?href=https://www.facebook.com/sharer.php?u=${serverUrl}/api/share/${appname}/${resultImage}/facebook`
                }
                rel='noopener noreferrer'
                onClick={() => shareGA('mobile', 'mobile-facebook')}>
                Facebook
              </a>

              <a
                className='w3-btn w3-fb whatsapp w3-large w3-text-shadow w3-bar-item width33 slide-in-top'
                href={`whatsapp://send?text=${serverUrl}/api/share/${appname}/${resultImage}/whatsapp`}
                rel='noopener noreferrer'
                onClick={() => shareGA('mobile', 'mobile-WhatsApp')}>
                Whatsapp
              </a>

              <a
                className='w3-btn w3-fb w3-twitter w3-large w3-text-shadow w3-bar-item width33 slide-in-top'
                href={`https://mobile.twitter.com/intent/tweet?url=${serverUrl}/api/share/${appname}/${resultImage}/twitter`}
                rel='noopener noreferrer'
                onClick={() => shareGA('mobile', 'mobile-twitter')}>
                Twitter
              </a>
            </div>
          </MobileView>
          <p>
            Tip: Tease your Friend by entering their name and profile picture and share with them <img src={`${serverUrl}/images/laugh.png`} alt='' />{' '}
          </p>
          <h3>More Apps</h3>
          <Apps currentApp={appname} />
        </div>
      )}
    </div>
  );
};

Result.propTypes = {
  resultImage: PropTypes.string,
  apps: PropTypes.array,
  count: PropTypes.number.isRequired,
  countIncrement: PropTypes.func,
  done: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  resultImage: state.userDetailsData.resultImage,
  appname: state.userDetailsData.appname,
  apps: state.appsData.apps,
  count: state.countData.count,
  done: state.countData.done
});

export default connect(
  mapStateToProps,
  { countIncrement }
)(Result);
