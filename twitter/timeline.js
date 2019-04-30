const request = require('request');

class Timeline {
  static request(bearerToken, screenName) {
    return new Promise((resolve, reject) => {

      request.get({
        url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        qs: {
          screen_name: screenName,
          trim_user: 1
        },
        headers: {
          "Authorization": `Bearer ${ bearerToken }`
        }
      }, (err, response, body) => {
        console.log('err', err)
        console.log('resp', response)
        console.log('body', body);
        const parsed = JSON.parse(body);
        resolve(parsed);
      });
    });
  }
}

module.exports = Timeline;
