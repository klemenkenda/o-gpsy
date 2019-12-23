// imports
const express = require('express');

// import controllers
const admin = require('../controller/admin.ctrl');

// create router
exports.prepareAdminRoutes = () => {
    let router = express.Router();

    // actual admin routes
    router.get('/login/:u/:p', admin.login);

    // GUI/admin routes
    router.get('/events/:user_id?', admin.getEvents);
    router.get('/event/:event_id', admin.getEvents);

    // GUI/admin/map routes
    router.post('/maps/add/', admin.addMap);
    router.post('/maps/upload/:file_name', admin.uploadMap);
    router.post('/maps/edit/', admin.editMap);
    router.post('/maps/delete/', admin.deleteMap);
    router.get('/maps/:user_id?', admin.getMaps);

    return (router);
};