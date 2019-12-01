const Storage = require('../services/admin_storage_mariadb');
const storage = new Storage();

const Utils = require('./req_utils');

exports.login = (req, res) => {
    res.send("OK");
};

exports.getEvents = async (req, res) => {
    let user_id = Utils.emptyIsNull(req.params.user_id);
    if (user_id != null) {
        user_id = parseInt(user_id);
    }

    const events = await storage.getEvents(user_id);
    res.json(events);
}