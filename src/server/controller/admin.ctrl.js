const fs = require('fs');
const MAPS_DIR = require('../routes/static').MAPS_DIR;
const Storage = require('../services/admin_storage_mariadb');
const storage = new Storage();

const Utils = require('./req_utils');

exports.login = async (req, res) => {
    const username = req.params.u;
    const password = req.params.p;

    const r = await storage.getLogin(username, password);
    res.json(r);
};

exports.getLog = async (req, res) => {
    const n = Utils.existsBodyParam(req.query, "n") ? Utils.extractBodyParam(req.query, "n") : 20;
    const r = await storage.getLog(n);
    res.json(r);
}

exports.getEvents = async (req, res) => {
    let user_id = Utils.emptyIsNull(req.params.user_id);
    if (user_id !== null) {
        user_id = parseInt(user_id);
    }

    let event_id = Utils.emptyIsNull(req.params.event_id);
    if (event_id !== null) {
        event_id = parseInt(event_id);
    }

    let events;

    if (event_id) {
        events = await storage.getEvent(event_id);
    } else {
        events = await storage.getEvents(user_id);
    }

    res.json(events);
};

exports.getMaps = async (req, res) => {
    let user_id = Utils.emptyIsNull(req.params.user_id);
    if (user_id != null) {
        user_id = parseInt(user_id);
    }

    const events = await storage.getMaps(user_id);
    res.json(events);
};

exports.addMap = async (req, res) => {
    let map = req.body.map;
    if (!map) {
        throw 'Missing the map';
    }

    map = await storage.addMap(map);
    res.json(map);
};

exports.uploadMap = async (req, res) => {
    // todo restrict to images with limited size
    const fileName = decodeURIComponent(req.params.file_name);
    const filePath = `${__dirname}/../${MAPS_DIR}/${fileName}`;

    req.on('data', (d) => {
        fs.appendFile(filePath, d, (e) => {
            if (e) throw e;
        });
    });
    req.on('error', () => res.sendStatus(500));
    req.on('end', () => {
        res.json(fileName);
    });
};

exports.editMap = async (req, res) => {
    let map = req.body.map;
    if (!map) {
        throw 'Missing the map';
    }

    map = await storage.editMap(map);
    res.json(map);
};

exports.deleteMap = async (req, res) => {
    let id = req.body.id;
    if (!id) {
        throw 'Missing the map';
    }
    id = parseInt(id);

    let map = await storage.deleteMap(id);
    res.json(map);
};

exports.getTrackers = async (req, res) => {
    const trackers = await storage.getTrackers();
    res.json(trackers);
}

exports.addTracker = async (req, res) => {
    const tracker = await storage.deleteTracker(id);
    res.json(req.params);
}

exports.updateTracker = async (req, res) => {
    res.json({});
}

exports.deleteTracker = async (req, res) => {
    let id = Utils.emptyIsNull(req.params.id);
    if (id !== null) {
        id = parseInt(id);
    }
    const tracker = await storage.deleteTracker(id);
    res.json(tracker);
}