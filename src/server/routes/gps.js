// imports
const express = require('express');

// import controllers
const gps = require('../controller/gps');
const time = require('../controller/time');

// create router
exports.prepareGPSRoutes = () => {
    let router = express.Router();
    router.get('/register/:u/:p/:x/:y/:t', gps.writeCoordinates);
    router.get('/point/:u', gps.getPoint);
    router.get('/timestamp', time.getTime);
    router.get('/competitors', gps.getCompetitors);

    return(router);
}