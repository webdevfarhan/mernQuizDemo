const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('config');
let domain = config.get('domain');
const productionDomain = config.get('productionDomain');
if (process.env.MODE === 'localhost') {
  domain = productionDomain;
}
const AppResult = require('../../utils/apps-results');

const generateUniqueChars = require('../../utils/common-functions');

const xAuth = config.get('x-auth');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if (file.mimetype !== 'image/jpeg') return cb('Invalid image format');
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    let uChars = generateUniqueChars(7);
    cb(null, file.fieldname + '-' + Date.now() + uChars + '.jpg');
  }
});

const upload = multer({
  storage,
  limits: {
    fieldNameSize: 10,
    fieldSize: 100,
    fields: 3,
    fileSize: 250000,
    files: 1
  }
}).single('dp');

//Get user Profile picture, name and appname
router.post('/user-details', async (req, res) => {
  upload(req, res, async err => {
    if (err instanceof multer.MulterError) {
      console.log('// A Multer error occurred when uploading.');
      console.log(err);
      return res.status(401).json({ msg: 'Something went wrong code 2312' });
    } else if (err) {
      console.log('// An unknown error occurred when uploading.');
      console.log(err);
      return res.status(401).json({ msg: 'Something went wrong code 2312' });
    }
    let file = req.file;
    let { appname, name, gender } = req.body;
    if (req.headers.xauth) {
      if (req.headers.xauth === xAuth) {
        if (file.mimetype.indexOf('jpeg') !== -1) {
          const imageName = await AppResult(appname, file.filename, file.path, name, gender);
          return res.status(200).json({ imageName, appname });
        } else {
          console.log('case 2 file type not allowed');
          return res.status(401).json({ msg: 'Error! Something went wrong!' });
        }
      } else {
        console.log('case 3 xauth not valid');
        return res.status(401).json({ msg: 'Something went wrong, please refresh' });
      }
    }
  });
});

module.exports = router;
