require('dotenv').config();

const Twitter = require('./twitter');
const ntc = require('./vendor/ntc/ntc');

const targetScreenName = 'everycolorbot';
const botScreenName = 'colornamebot';
let bearerToken;

Twitter.Bearer.requestToken(process.env.TWITTER_CONSUMER_API_KEY, process.env.TWITTER_CONSUMER_API_SECRET).then(response => {
  bearerToken = response;
  return response;
}).then(response => {
  return Twitter.Timeline.request(bearerToken, botScreenName, { count: 1 }).then(response => {
    return response[0]["in_reply_to_status_id"];
  })
}).then(sinceId => {
  return Twitter.Timeline.request(bearerToken, targetScreenName, { since_id: sinceId, count: 200 });
}).then(tweets => {
  //Using a reverse loop here so our sinceId lines up for the *next* run.
  //
  //since_id param *includes* that id as well, so lets skip that one.
  //
  for(let i = tweets.length - 1; i--;) {
    const tweet = tweets[i];
    const id = tweet.id_str;
    const text = tweet.text.split(' ')[0];
    const hex = `#${ text.split(" ")[0].slice(2, 8) }`;
    const colorName = ntc.name(hex)[1];
    const status = `@${ targetScreenName } ${ colorName }`;

    console.log(status);

    //Twitter.Status.update(
      //process.env.TWITTER_CONSUMER_API_KEY,
      //process.env.TWITTER_CONSUMER_API_SECRET,
      //process.env.TWITTER_ACCOUNT_ACCESS_TOKEN,
      //process.env.TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
      //status,
      //{
        //in_reply_to_status_id: id
      //}
    //);
  }
}).catch(error => {
  console.log('error', error);
});
