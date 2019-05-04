const request = require('request');

class Bearer {
  static requestToken(consumerAPIKey, consumerAPISecret) {
    return new Promise((resolve, reject) => {
      const encodedSecret = this.encodeKeyAndSecret(consumerAPIKey, consumerAPISecret);

      request.post({
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
          'Authorization': `Basic ${ encodedSecret }`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },

        form: {
          grant_type: 'client_credentials'
        }
      }, (err, response, body) => {
        const parsed = JSON.parse(body);
        resolve(parsed["access_token"]);
      });
    });
  };

  static encodeKeyAndSecret(consumerAPIKey, consumerAPISecret) {
    return new Buffer(`${ consumerAPIKey }:${ consumerAPISecret }`).toString('base64');
  }
}

module.exports = Bearer;
