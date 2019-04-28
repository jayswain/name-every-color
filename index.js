require('dotenv').config();

const Bearer = require('./twitter/bearer');

Bearer.requestToken(process.env.TWITTER_CONSUMER_API_KEY, process.env.TWITTER_CONSUMER_API_SECRET).then(response => {
  console.log(response);
}).catch(error => {
  console.log('error', error);
});

//const screenName = 'everycolorbot';

//https.request(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${screenName}`, (resp) => {
  //console.log('statusCode:', resp.statusCode);

//}).on("error", (err) => {
  //console.log("Error: " + err.message);
//});
//
