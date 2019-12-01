const Storage = require('../services/admin_storage_mariadb');
const storage = new Storage();

const Utils = require('./req_utils');

exports.login = (req, res) => {
    res.send("OK");
};

exports.getEvents = (req, res) => {
    const event_id = req.params
    res.json([]);
}