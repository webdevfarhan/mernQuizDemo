const express = require('express');
const app = express();
const PORT = 5001;
const cors = require('express-cors');
const path = require('path');
const apps = require('./config/apps');
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://89e49e4b8bb1446294f8749cb46f0172@sentry.io/1527001' });
app.set('view engine', 'ejs');
app.use('/images', express.static('images'));
app.use('/uploads', express.static('uploads'));
app.use('/results', express.static('results'));
app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));
app.use(express.static('client/build'));
app.use(
  cors({
    allowedOrigins: ['http://localhost:3000', 'http://localhost:5001'],
    headers: ['xauth', 'content-type']
  })
);

app.get('/apps', async (req, res) => {
  res.status(200).json(apps);
});

app.get('/sw-8e2b1.js', async (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'sw-8e2b1.js'));
});

app.get('/ads.txt', async (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'ads.txt'));
});

app.use('/api/user', require('./routes/api/user-details'));
app.use('/api/share', require('./routes/share'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server started on port : ', PORT);
});
