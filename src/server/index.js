// imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const gps = require('./controller/gps');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const router = express.Router();

const REACT_BUILD_DIR = "../frontend/build";


/** Prepare GUI routes - React and some static stuff */
function prepareGuiRoutes() {
    // never send any html files
    app.use("/*.html", (req, res, next) => {
        return res.status(403).end("403 Forbidden");
    });
    // otherwise send everything in static dir
    app.use(express.static(path.resolve(__dirname, REACT_BUILD_DIR), { index: false }));
    // now the main stuff - React
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, REACT_BUILD_DIR, "index.html"));
    });
    // log and handle custom errors
    app.use((err, req, res, next) => {
        console.log("Error:", req.path);
        console.log(err);
        if (err instanceof AppError || req.originalUrl.startsWith(API_PREFIX)) {
            // send raw error text
            res.status(500).send(err.message);
        } else {
            // call default error handler
            // it creates an HTML page with error message
            next(err);
        }
    });
}

router.get('/register/:u/:p/:x/:y/:t', gps.writeCoordinates);
router.get('/point/:u', gps.getPoint);
app.use('/api', router);

prepareGuiRoutes();

app.listen(8000);