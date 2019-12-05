# O-GPSY

> This software is still under heavy development.

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

O-GPSY is another attempt to make following orienteering trainings easy. It is supposed to be an open source alternative to the more reliable (but closed) solutions (gpsseuranta, TracTrac, etc. which are usually better - for now :)).

The solution uses some traditional technologies like MariaDB and some standard web solutions like NodeJS, React, Bootstrap and Leaflet.

*Currently we support the following technology:*

* smart phone with [GPSLogger](http://gpslogger.app) for Android (alpha phase)
* Teltonika TMT250 (under development)

Teltonika TMT250 AVL NodeJS driver is being developed [here](http://github.com/klemenkenda/tmt250-node).

## Components

* `common` - folder with config files
* `docker` - folder with docker compose for MariaDB and Adminer
* `frontend` - frontend based on Bootstrap, React and Leaflet (admin and viewer for users)
* `server` - backend GUI server based on NodeJS and MariaDB; in addition it supports HTTP requests from trackers (such as smart phones using GPSLogger (for Android)
* `storage` - folder with SQL definitions and others

*TODO*:

* `integrations/tmt250-tcp` - TMT250 tracker gateway for TCP requests
* `integrations/tmt250-sms` - TMT250 tracker gateway (for Android phone) for SMS requests

## Prerequisites

* Linux/Windows/Mac (tested only on Windows and WSL)
* Docker (`docker-compose`)
  * alternatively you can install MariaDB and Adminer (optional) locally
* NodeJS (v8+), `npm`

## Production

For production mode go to `src/frontend` and run `npm install` and then `npm run build`. This will build the last version of the frontend into the `build` directory. This one gets automatically served with o-gpsy server in `src/server`. You start the server simply by `npm start` (be aware to run `npm install` before). The app will be served on port 8000.

## Development

Development server runs on port 3000. You start it simply by `npm start` in `src/frontend`. This will start react-tools and the changes will be automatically visible in the front end. Visit [http://localhost:3000](http://localhost:3000) for this version. This version uses the server running on port `8000` (see Production). The prerequisite is to start MariaDB service. This can be done with Docker (`src/docker`) with a command `docker-compose up`. If you run `docker-compose` Adminer is also available on `docker-machine ip` on port `8080`. Be careful to provide correct data to `src/common/config.json`.

### Plan for o-gpsy [ PHASE 1 / MVP ]

* <del>Multiple events tracking</del> [ done ]
   * <del>Changing runner array to hash</del> [ done ]
* Provide administration interface for users/clubs
   * <del>Login</del> [ done ]
   * Create standard CRUD template to be used for all of the following tasks
      * List/add/edit/delete users
      * List/add/edit/delete tracker
      * List/add/edit/delete runner to the competition
      * List/add/edit/delete new competition
      * List/add/edit/delete new map
* Live view: user interface
   * <del>Show full track</del> [ done ]
   * <del>Working controls</del> [ done ]
       * <del>Tail on/off</del> [ done ]
       * <del>Label on/off</del> [ done ]
       * Various tail lengths (+/-)
   * List of runners
       * Display name/color
       * On/off functionality
       * Calculate speed
   * Show clock + replay/sync (like gpsseuranta)
   * Replay functionality
   * Sync for replay
* Services
   * TMT250 TCP service

### Plan for o-gpsy [ PHASE 2 / upgrade ]

* Prepare manifest file & logo for mobile desktop app
* Provide administration interface for users/clubs
   * Add specialized interfaces
      * Add/edit/delete runners to the competition
      * Add/edit new competition
      * Add/edit new map
   * Export GPX for each runner (and for whole training)
   * Add course editor (idea is to have one map in the system; just add controls for trainings)
   * Provide user interface to fit the map to the basemap (like Routegadget)
   * 2drerun (export) + docs
* Live view: user interface
   * Use 4 coordinates to fit the map to basemap (like Routegadget)
* Analysis view: user interface
   * show tracks color-coded by speed (like in QuickRoute)
* Services
   * TMT250 SMS service
* Docs
   * Manual for Android app (GPSLogger)
   * Manual for TMT250
   * Manual for usage of the app
       * Desktop
       * Phone
* Development
   * Using flow for type checking
   * Using jest for unit tests (frontend)
   * Using mocha (or jest) for unit tests (server)

> Help is needed! Developers welcome. Support from future users (testing, beta testing) too. :)



[<image src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8NMLS5RYUERDL&currency_code=EUR&source=url)
