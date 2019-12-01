// imports
const express = require('express');

// import controllers
const admin = require('../controller/admin');

// create router
exports.prepareAdminRoutes = () => {
    let router = express.Router();
    // acctual admin routes
    router.get('/login/:u/:p', admin.login);

    // GUI/admin routes
    router.get('/events/:event_id?', admin.getEvents);

    return(router);
}