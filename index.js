require('dotenv').config();

const Bearer = require('./twitter/bearer');
const Timeline = require('./twitter/timeline');
const Status = require('./twitter/status');
const ntc = require('./vendor/ntc/ntc');

const screenName = 'everycolorbot';

Bearer.requestToken(process.env.TWITTER_CONSUMER_API_KEY, process.env.TWITTER_CONSUMER_API_SECRET).then(response => {
  const bearerToken = response;

  Timeline.request(bearerToken, 'colornamebot', { count: 1 }).then(response => {
    sinceId = response[0]["in_reply_to_status_id"];

    Timeline.request(bearerToken, screenName, { since_id: sinceId, count: 200 }).then(response => {
      //Using a reverse loop here so our sinceId lines up for the *next* run.
      //
      //since_id param *includes* that id as well, so lets skip that one.
      //
      for(let i = response.length - 1; i--;) {
        const tweet = response[i];
        console.log(tweet.text, tweet.id);
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
      }
    }).catch(error => {
      console.log('error', error);
    });
  });

}).catch(error => {
  console.log('error', error);
});
