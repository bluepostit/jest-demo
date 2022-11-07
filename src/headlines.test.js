const loadHeadlines = require('./headlines');

const twitter = require('./twitter');
jest.mock('./twitter');

test('loads headlines with one URL only', () => {
    twitter.getToken.mockResolvedValue('fake token');

    twitter.getTweets.mockResolvedValue([
        {
            entities: {
                urls: [
                    {
                        url: 'https://www.spiced-academy.com',
                    },
                ],
            },
            full_text: 'A tweet with one URL',
        },
        {
            entities: {
                urls: [
                    {
                        url: 'https://www.spiced-academy.com',
                    },
                    {
                        url: 'https://www.duckduckgo.com.com',
                    },
                ],
            },
            full_text: 'A tweet with two URLs',
        },
        {
            entities: {},
            full_text: 'A tweet with no URLs',
        },
    ]);

    return loadHeadlines().then((tweets) => {
        console.log(tweets);
        expect(tweets.length).toBe(1);
    });
});
