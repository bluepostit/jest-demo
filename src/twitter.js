const https = require('https');
const { promisify } = require('util');

const { TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCOUNT } = process.env;

const getToken = (callback) => {
    const credentials = `${TWITTER_API_KEY}:${TWITTER_API_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    const config = {
        host: 'api.twitter.com',
        path: '/oauth2/token',
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
    };

    const getTokenCallback = (result) => {
        if (result.statusCode !== 200) {
            callback(new Error(result.statusCode));
            return;
        }

        let body = '';
        result
            .on('data', (chunk) => (body += chunk))
            .on('error', (error) => {
                console.log(error);
                callback(new Error(error));
            })
            .on('end', () => {
                const data = JSON.parse(body);
                callback(null, data.access_token);
            });
    };

    const request = https.request(config, getTokenCallback);
    request.end('grant_type=client_credentials');
};

const getTweets = function (token, callback) {
    const baseUrl = '/1.1/statuses/user_timeline.json';
    const options = {
        host: 'api.twitter.com',
        path: `${baseUrl}?screen_name=${TWITTER_ACCOUNT}&tweet_mode=extended`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const request = https.request(options, (response) => {
        if (response.statusCode !== 200) {
            callback(new Error(response.statusCode));
            return;
        }

        let body = '';
        response
            .on('data', (chunk) => {
                body += chunk;
            })
            .on('end', () => {
                let parsedBody = JSON.parse(body);
                callback(null, parsedBody);
            });
    });
    request.end();
};

module.exports.getToken = promisify(getToken);

module.exports.getTweets = promisify(getTweets);
