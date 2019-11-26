# O-GPSY
O-GPSY is another attempt to make following orienteering trainings easy. It is supposed to be an open source solution for the traditionally expensive alternatives (gpsseuranta, TracTrac, etc. which are usually better - for now :)).

## Components

* `common` - folder with config files
* `docker` - folder with docker compose for MariaDB and Adminer
* `frontend` - frontend based on Bootstrap, React and Leaflet (admin and viewer for users)
* `server` - backend GUI server based on NodeJS and MariaDB; in addition it supports HTTP requests from trackers (such as smart phones using GPSLogger (for Android))
* `storage` - folder with SQL definitions and others

*TODO*:

* `integrations/TMT250-server` - TMT250 tracker gateway for TCP requests
* `integrations/TMT250-sms` - TMT250 tracker gateway (for Android phone) for SMS requests
