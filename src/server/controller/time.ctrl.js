const TimeService = require('../services/time');
const timeService = new TimeService();

exports.getTime = (req, res) => {
    const ts = timeService.getTime();
    res.json(ts);
};
