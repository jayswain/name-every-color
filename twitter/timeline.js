const https = require('https');

class Timeline {
  static request(bearerToken, screenName) {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.twitter.com',
        port: 443,
        path: `/1.1/statuses/user_timeline.json?screen_name=${ screenName }&trim_user=1`,
        headers: {
          "Authorization": `Bearer ${ bearerToken }`
        }
      };

      const req = https.get(options, (res) => {
        let body = '';
        res.on('data', (d) => {
          body += d;
        });

        res.on('end', () => {
          const parsed = JSON.parse(body);
          resolve(parsed);
        });
      });

      req.on('error', (e) => {
        console.error('error:', e);
      });
    });
  }
}

module.exports = Timeline;
