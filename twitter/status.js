const request = require('request');

class Status {
  static update(consumerAPIKey, consumerAPISecret, clientAccessToken, clientAccessSecret, message, qsParams) {
    return new Promise((resolve, reject) => {
      request.post({
        url: `https://api.twitter.com/1.1/statuses/update.json`,
        oauth: {
          consumer_key: consumerAPIKey,
          consumer_secret: consumerAPISecret,
          token: clientAccessToken,
          token_secret: clientAccessSecret
        },
        qs: {
          ...qsParams,
          status: message
        }
      }, (err, response, body) => {
        console.log('error', err);
        console.log('body', body);
      });
    });
  };
}

module.exports = Status;
