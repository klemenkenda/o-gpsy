# O-GPSY
O-GPSY is another attempt to make following orienteering trainings easy. It is supposed to be an open source solution for the traditionally expensive alternatives (gpsseuranta, TracTrac, etc. which are usually better - for now :)).

The solution uses some traditional technologies like MariaDB and some standard web solutions like NodeJS, React, Bootstrap and Leaflet.

*Currently we support the following technology:*

* smart phone (with GPSLogger for Android)
* Teltonika TMT250 (under development)

Teltonika TMT250 AVL NodeJS driver is being developed at [here](http://github.com/klemenkenda/tmt250-node).

## Components

* `common` - folder with config files
* `docker` - folder with docker compose for MariaDB and Adminer
* `frontend` - frontend based on Bootstrap, React and Leaflet (admin and viewer for users)
* `server` - backend GUI server based on NodeJS and MariaDB; in addition it supports HTTP requests from trackers (such as smart phones using GPSLogger (for Android))
* `storage` - folder with SQL definitions and others

*TODO*:

* `integrations/TMT250-server` - TMT250 tracker gateway for TCP requests
* `integrations/TMT250-sms` - TMT250 tracker gateway (for Android phone) for SMS requests

## Production

For production mode go to `src/client` and run `npm run build`. This will build the last version of the frontend into the `build` directory. This one gets automatically served with o-gpsy server in `src/server`. You start the server simply by `npm start`. The app will be served on port 8000.

## Development

Development server runs on port 3000. You start it simply by `npm start` in `src/frontend`. This will start react-tools and the changes will be automatically visited in the front end. Visit [http://localhost:3000](http://localhost:3000) for this version. This version uses the server running on port 8000 (see Production).