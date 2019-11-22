// main imports
import React, { Component } from 'react';

// models

// backend
import { getBackend } from '../lib/Backend';

// import subcomponents

// import libraries
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// defining types
type Props = {};
type State = {
    competitors: [],
    tracks: []
};

// fixing marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


/**
 * Displaying production lines list.
 */
class Live extends Component<Props, State> {

    constructor() {
        super();
        this.state = {
            tracks: [
                { x: 46.056946, y: 14.505751 },
            ]
        };
    }

    loadTracks(event_id) {
        getBackend().live.getCoordinates(event_id,
            (data) => {
                this.setState({ tracks: data }, this.componentDidUpdate);
            },
            (err) => {
                console.log("Error");
            }
        );
    }

    updateMarkers() {
        if (this.marker) {
            let lat_lng = new L.LatLng(this.state.tracks[0].x, this.state.tracks[0].y);
            this.marker.setLatLng(lat_lng);
        }
    }

    componentDidMount() {
        getBackend().live.getCompetitors(1,
            (data) => {
                this.setState({ competitors: data });
            },
            (err) => {
                console.log("Error");
            }
        );

        this.loadTracks(1);

        // create a map
        this.map = L.map('map', {
            center: [46.056946, 14.505751],
            zoom: 16,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        });

        // add marker
        this.marker = L.marker([this.state.tracks[0].x, this.state.tracks[0].y]).addTo(this.map);

        // updating
        this.countdown = setInterval(() => this.loadTracks(), 1000);
    }

    render() {
        this.updateMarkers();
        return <div id="map" style={{width: "100%", height: "100vh"}}></div>
    }

}

export default Live;