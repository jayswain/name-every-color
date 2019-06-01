const request = require('request');

class Status {
  static async update(consumerAPIKey, consumerAPISecret, clientAccessToken, clientAccessSecret, message, qsParams) {
    const response = await new Promise((resolve, reject) => {
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
        const parsed = JSON.parse(body);
        resolve(parsed);
      });
    });
    return response;
  };
}

module.exports = Status;
