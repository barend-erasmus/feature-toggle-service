export let config = {
    baseUri: 'http://yourdomain.com',
    web: {
        uri: 'http://yourdomain.com',
    },
    logging: {
        enabled: false,
        path: '/logs/',
    },
    db: {
        uri: 'mongodb://mongo:27017/featuretoggle'
    },
};
