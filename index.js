require('dotenv').config();

const Bearer = require('./twitter/bearer');
const Timeline = require('./twitter/timeline');
const ntc = require('./vendor/ntc/ntc');

const screenName = 'everycolorbot';

Bearer.requestToken(process.env.TWITTER_CONSUMER_API_KEY, process.env.TWITTER_CONSUMER_API_SECRET).then(response => {
  const bearerToken = response;

  Timeline.request(bearerToken, screenName).then(response => {
    response.forEach((tweet) => {
      const text = tweet.text.split(' ')[0];
      const hex = `#${ text.split(" ")[0].slice(2, 8) }`;
      const colorName = ntc.name(hex);
      console.log(colorName);
    });
  }).catch(error => {
    console.log('error', error);
  });
}).catch(error => {
  console.log('error', error);
});
