// imports
const express = require('express');
const app = express();

const gps = require('./controller/gps');

app.get('/api/register/:u/:p/:x/:y/', (req, res) => {
    console.log(req.params);
});

app.listen(3000);