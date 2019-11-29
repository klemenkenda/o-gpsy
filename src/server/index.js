// constants
const PORT = 8000;

// imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

// loading routers
const gpsRouter = require('./routes/gps');
const guiRouter = require('./routes/gui');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


guiRouter.prepareMapRoutes(app);
app.use('/api', gpsRouter.prepareGPSRoutes());
guiRouter.prepareGuiRoutes(app);

console.log("Starting server on port", PORT)
app.listen(PORT);