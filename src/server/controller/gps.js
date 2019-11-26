const Storage = require('../services/gps_storage_mariadb');
const storage = new Storage();

exports.writeCoordinates = (req, res) => {
    // extract data
    const u = req.params.u;
    const p = req.params.p;

    const x = req.params.x;
    const y = req.params.y;
    const ts = req.params.t;

    console.log(x, y, ts);
    storage.addGPS(u, p, x, y, ts);
    res.send("OK");
};