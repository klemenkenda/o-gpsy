// imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const gps = require('./controller/gps');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const router = express.Router();

router.get('/api/register/:u/:p/:x/:y/:t', gps.writeCoordinates);
router.get('/api/point/:u', gps.getPoint);
app.use('/', router);

app.listen(8000);