# O-GPSY

> This software is still under heavy development.

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

O-GPSY is another attempt to make following orienteering trainings easy. It is supposed to be an open source solution for the traditionally expensive alternatives (gpsseuranta, TracTrac, etc. which are usually better - for now :)).

The solution uses some traditional technologies like MariaDB and some standard web solutions like NodeJS, React, Bootstrap and Leaflet.

*Currently we support the following technology:*

* smart phone with [GPSLogger](http://gpslogger.app) for Android (test phase)
* Teltonika TMT250 (under development)

Teltonika TMT250 AVL NodeJS driver is being developed [here](http://github.com/klemenkenda/tmt250-node).

## Components

* `common` - folder with config files
* `docker` - folder with docker compose for MariaDB and Adminer
* `frontend` - frontend based on Bootstrap, React and Leaflet (admin and viewer for users)
* `server` - backend GUI server based on NodeJS and MariaDB; in addition it supports HTTP requests from trackers (such as smart phones using GPSLogger (for Android)
* `storage` - folder with SQL definitions and others

*TODO*:

* `integrations/TMT250-server` - TMT250 tracker gateway for TCP requests
* `integrations/TMT250-sms` - TMT250 tracker gateway (for Android phone) for SMS requests

## Prerequisites

* Linux/Windows/Mac (tested only on Windows and WSL)
* Docker (`docker-compose`)
  * alternatively you can set MariaDB and Adminer (optional) locally
* NodeJS (v8+), `npm`

## Production

For production mode go to `src/frontend` and run `npm run build`. This will build the last version of the frontend into the `build` directory. This one gets automatically served with o-gpsy server in `src/server`. You start the server simply by `npm start`. The app will be served on port 8000.

## Development

Development server runs on port 3000. You start it simply by `npm start` in `src/frontend`. This will start react-tools and the changes will be automatically visited in the front end. Visit [http://localhost:3000](http://localhost:3000) for this version. This version uses the server running on port `8000` (see Production). The prerequisite is to start MariaDB service. This can be done with Docker (`src/docker`) with a command `docker-compose up`. If you run `docker-compose` Adminer is also available on `docker-machine ip` on port `8080`. Be careful to provide correct data to `src/common/config.json`.



[<image src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8NMLS5RYUERDL&currency_code=EUR&source=url)
