const config = require('config');
let domain = config.get('domain');
const productionDomain = config.get('productionDomain');
if (process.env.MODE !== 'localhost') {
  domain = productionDomain;
}

const apps = [
  {
    name: 'pubg1',
    title: 'Are you Pro or Noob in Pubg ?',
    imgUrl: `${domain}/images/thumbImages/pubg1.jpg`
  },
  {
    name: 'nameMean',
    title: 'What Does Your name mean?',
    imgUrl: `${domain}/images/thumbImages/name.jpg`
  },
  {
    name: 'pastlife',
    title: 'What were you in your pastlife ?',
    imgUrl: `${domain}/images/thumbImages/pastlife.jpg`
  },
  {
    name: 'wiki',
    title: 'What Does Wiki Says About You?',
    imgUrl: `${domain}/images/thumbImages/wiki.png`
  },
  {
    name: 'die',
    title: 'How will You Die ?',
    imgUrl: `${domain}/images/thumbImages/die.jpg`
  },
  {
    name: 'animal',
    title: 'Which animal are you when angry?',
    imgUrl: `${domain}/images/thumbImages/angry.jpg`
  },
  {
    name: 'success',
    title: 'Which Quote can make you Successful?',
    imgUrl: `${domain}/images/thumbImages/success.jpg`
  },
  {
    name: 'shokugeki',
    title: 'Which Shokugeki no soma character are you ?',
    imgUrl: `${domain}/images/thumbImages/shokugeki.jpg`
  },
  {
    name: 'friends',
    title: 'Which Friend character are you ?',
    imgUrl: `${domain}/images/thumbImages/friends.jpg`
  }
];

module.exports = apps;
