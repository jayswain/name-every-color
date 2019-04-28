require('dotenv').config();

const Bearer = require('./twitter/bearer');
const Timeline = require('./twitter/timeline');

const screenName = 'everycolorbot';

Bearer.requestToken(process.env.TWITTER_CONSUMER_API_KEY, process.env.TWITTER_CONSUMER_API_SECRET).then(response => {
  const bearerToken = response;

  Timeline.request(bearerToken, screenName).then(response => {
    console.log(response);
  }).catch(error => {
    console.log('error', error);
  });
}).catch(error => {
  console.log('error', error);
});
