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
    res.send('OK');
};

exports.getPoint = async (req, res) => {
    // extract data
    const u = req.params.u;
    const r = await storage.getPoint(u);
    res.json(r);
};

exports.getCompetitors = async (req, res) => {
    // extract data
    const event_id = req.query.event_id;
    const r = await storage.getCompetitors(event_id);
    res.json(r);
};