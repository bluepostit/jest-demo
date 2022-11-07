/**
 * Filter tweets to include only those with one URL.
 * For each filtered tweet, return only its text (without URLs)
 * and its URL
 * @param {array} tweets
 * @returns
 */
module.exports.filterTweets = (tweets) => {
    return tweets
        .filter(function (item) {
            return item.entities.urls && item.entities.urls.length == 1;
        })
        .map(function (item) {
            return {
                text: text.trim(),
                href: 'https://fake.url',
            };
        });
};
