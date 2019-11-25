// imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const gps = require('./controller/gps');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/api/register/:u/:p/:x/:y/:t', (req, res) => {
    const x = req.params.x;
    const y = req.params.y;
    const ts = req.params.ts;
    console.log(x, y, ts);
    res.send("OK");
});




app.listen(3000);