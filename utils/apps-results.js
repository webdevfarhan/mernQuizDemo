const animal = require('./animal/index');
const pastlife = require('./pastlife/index');
const wiki = require('./wiki/index');
const nameMean = require('./nameMean/index');
const success = require('./success/index');
const die = require('./die/index');
const shokugeki = require('./shokugeki/index');
const friends = require('./friends/index');
const pubg1 = require('./pubg1/index');
const pubg2 = require('./pubg2/index');

const AppResult = async (appname, filename, dp, name, gender) => {
  filename = filename.replace('dp-', '');
  let FileName;
  switch (appname) {
    case 'animal':
      FileName = await animal(appname, filename, dp, name);
      return FileName;
    case 'pastlife':
      FileName = await pastlife(appname, filename, dp, name);
      return FileName;
    case 'wiki':
      FileName = await wiki(appname, filename, dp, name, gender);
      return FileName;
    case 'nameMean':
      FileName = await nameMean(appname, filename, dp, name, gender);
      return FileName;
    case 'success':
      FileName = await success(appname, filename, dp, name, gender);
      return FileName;
    case 'die':
      FileName = await die(appname, filename, dp, name, gender);
      return FileName;
    case 'shokugeki':
      FileName = await shokugeki(appname, filename, dp, name, gender);
      return FileName;
    case 'pubg1':
      FileName = await pubg1(appname, filename, dp, name, gender);
      return FileName;
    case 'pubg2':
      FileName = await pubg2(appname, filename, dp, name, gender);
      return FileName;
    case 'friends':
      FileName = await friends(appname, filename, dp, name, gender);
      return FileName;
    default:
      console.log('no appname provided error');
      return 'default';
  }
};

module.exports = AppResult;
