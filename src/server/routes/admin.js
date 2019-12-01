// imports
const express = require('express');

// import controllers
const admin = require('../controller/admin');

// create router
exports.prepareAdminRoutes = () => {
    let router = express.Router();
    router.get('/login/:u/:p', admin.login);

    return(router);
}