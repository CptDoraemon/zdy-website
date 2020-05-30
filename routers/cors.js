const URLs = require('./URLs');
const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:3000'],
    // origin: '*',
    maxAge: 31536000,
    methods: 'GET'
};

const useCorsForSelectedRouters = (app) => {
    const routers = [
        URLs.getData,
        URLs.requestZip,
        URLs.download
    ];

    routers.forEach(_ => {
        app.use(_, cors(corsOptions));
    });
};

module.exports = useCorsForSelectedRouters;
