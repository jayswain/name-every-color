const https = require('https');

class Bearer {
  static requestToken(consumerAPIKey, consumerAPISecret) {
    return new Promise((resolve, reject) => {
      const encodedSecret = this.encodeKeyAndSecret(consumerAPIKey, consumerAPISecret);

      const options = {
        hostname: 'api.twitter.com',
        port: 443,
        path: '/oauth2/token',
        method: 'POST',
        headers: {
          'Authorization': `Basic ${ encodedSecret }`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      };

      const req = https.request(options, (res) => {
        //FIXME - use on('end') instead
        res.on('data', (d) => {
          const parsed = JSON.parse(d.toString('utf8'));
          resolve(parsed["access_token"]);
        });
      });

      req.on('error', (e) => {
        console.error('error:', e);
      });

      req.write('grant_type=client_credentials');
      req.end();
    });
  };

  static encodeKeyAndSecret(consumerAPIKey, consumerAPISecret) {
    return new Buffer(`${ consumerAPIKey }:${ consumerAPISecret }`).toString('base64');
  }
}

module.exports = Bearer;
