// imports
const express = require('express');
const path = require('path');

// define constants
const REACT_BUILD_DIR = '../../frontend/build';
const MAPS_DIR = 'public/maps';
exports.MAPS_DIR = MAPS_DIR;

/** Prepare GUI routes - React and some static stuff */
exports.prepareGuiRoutes = (app) => {
    // never send any html files
    app.use('/*.html', (req, res) => {
        return res.status(403).end('403 Forbidden');
    });
    // otherwise send everything in static dir
    app.use(express.static(path.resolve(__dirname, REACT_BUILD_DIR), { index: false }));
    // now the main stuff - React
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, REACT_BUILD_DIR, 'index.html'));
    });
    // log and handle custom errors
    app.use((err, req, res, next) => {
        console.log('Error:', req.path);
        console.log(err);

        next(err);
    });
};

exports.prepareMapRoutes = (app) => {
    // maps route
    app.use('/maps', express.static(MAPS_DIR));
};