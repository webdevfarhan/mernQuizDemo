const express = require('express');
const router = express.Router();
const apps = require('../config/apps');
const config = require('config');
let domain = config.get('domain');
const productionDomain = config.get('productionDomain');
if (process.env.MODE !== 'localhost') {
  domain = productionDomain;
}

router.get('/:appname/:resultImage/:socialNetwork', async (req, res) => {
  const { appname, resultImage, socialNetwork } = req.params;
  const app = apps.find(app => app.name === appname);
  const { title, name } = app;
  let resultImageUrl = `${domain}/results/${name}/${resultImage}`;
  socialNetwork === 'twitter' && res.render('twitter.ejs', { title, appname, resultImageUrl, domain, resultImage });
  socialNetwork === 'facebook' && res.render('facebook.ejs', { title, appname, resultImageUrl, domain, resultImage });
  socialNetwork === 'whatsapp' && res.render('whatsapp.ejs', { title, appname, resultImageUrl, domain, resultImage });
});

module.exports = router;
