const ntc = require('./vendor/ntc');
const Twitter = require('./twitter');

const TARGET_SCREEN_NAME = 'everycolorbot';
const BOT_SCREEN_NAME = 'colornamebot';

class App {
  static run() {
    process.stdout.write('Running...' + '\n');
    let bearerToken;

    Twitter.Bearer.requestToken(process.env.TWITTER_CONSUMER_API_KEY, process.env.TWITTER_CONSUMER_API_SECRET).then(response => {
      bearerToken = response;
      return response;
    }).then(response => {
      //find the id of the last tweet our bot responded to
      return Twitter.Timeline.request(bearerToken, BOT_SCREEN_NAME, { count: 1 }).then(response => {
        return response[0]["in_reply_to_status_id"];
      })
    }).then(sinceId => {
      //find the tweets of the target bot since we last responded
      return Twitter.Timeline.request(bearerToken, TARGET_SCREEN_NAME, { since_id: sinceId, count: 200 });
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
        const status = `@${ TARGET_SCREEN_NAME } ${ colorName }`;

        Twitter.Status.update(
          process.env.TWITTER_CONSUMER_API_KEY,
          process.env.TWITTER_CONSUMER_API_SECRET,
          process.env.TWITTER_ACCOUNT_ACCESS_TOKEN,
          process.env.TWITTER_ACCOUNT_ACCESS_TOKEN_SECRET,
          status,
          {
            in_reply_to_status_id: id
          }
        )

        process.stdout.write('.');
      }
    }).then(() => {
      process.stdout.write('\n' + 'Finished' + '\n');
    }).catch(error => {
      console.log('error', error);
    });
  }
}

module.exports = App;
