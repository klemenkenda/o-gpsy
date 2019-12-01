const Storage = require('../services/admin_storage_mariadb');
const storage = new Storage();

exports.login = (req, res) => {
    res.send("OK");
};