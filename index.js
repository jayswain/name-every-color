require('dotenv').config();

const Bearer = require('./twitter/bearer');
const Timeline = require('./twitter/timeline');
const Status = require('./twitter/status');
const ntc = require('./vendor/ntc/ntc');

const screenName = 'everycolorbot';

Bearer.requestToken(process.env.TWITTER_CONSUMER_API_KEY, process.env.TWITTER_CONSUMER_API_SECRET).then(response => {
  const bearerToken = response;

  Timeline.request(bearerToken, screenName).then(response => {
    response.forEach((tweet) => {
      const id = tweet.id_str;
      const text = tweet.text.split(' ')[0];
      const hex = `#${ text.split(" ")[0].slice(2, 8) }`;
      const colorName = ntc.name(hex)[1];
      const status = `@${ screenName } ${ colorName }`;
      Status.update(
        process.env.TWITTER_CONSUMER_API_KEY,
        process.env.TWITTER_CONSUMER_API_SECRET,
        process.env.TWITTER_ACCOUNT_ACCESS_TOKEN,
        process.env.TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
        status,
        {
          in_reply_to_status_id: id
        }
      );
    });
  }).catch(error => {
    console.log('error', error);
  });
}).catch(error => {
  console.log('error', error);
});
