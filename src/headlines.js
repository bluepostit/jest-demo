require('dotenv').config();
const twitterApi = require('./twitter');
const { filterTweets } = require('./twitter-filter');

const loadHeadlines = () => {
    return twitterApi
        .getToken()
        .then((token) => {
            return twitterApi.getTweets(token);
        })
        .then((tweets) => {
            return filterTweets(tweets);
        });
};

module.exports = loadHeadlines;
