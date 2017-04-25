export let config = {
    baseUri: 'http://localhost:3000',
    web: {
        uri: 'http://localhost:4200',
    },
    logging: {
        enabled: true,
        path: './',
    },
    db: {
        uri: 'mongodb://localhost:27017/featuretoggle'
    },
};
