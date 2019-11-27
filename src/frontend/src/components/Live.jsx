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
type Props = { };

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

    constructor(props) {
        super(props);
        this.state = {
            tracks: [
                { lat: 46.0430155, lon: 14.4879161 },
            ]
        };
    }

    loadTracks(event_id) {
        getBackend().live.getCoordinates(event_id,
            (data) => {
                let track = this.state.tracks;
                if (track[track.length - 1].ts) {
                    if (track[track.length - 1].ts !== data.ts) {
                        track.push(data);
                    }
                } else {
                    track.push(data);
                };

                this.setState({ tracks: track }, this.componentDidUpdate);
            },
            (err) => {
                console.log("Error");
            }
        );
    }

    updateMarkers() {
        if (this.marker) {
            const len = this.state.tracks.length;
            let lat_lng = new L.LatLng(this.state.tracks[len - 1].lat, this.state.tracks[len - 1].lon);
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
            center: [46.0420155, 14.4879161],
            zoom: 16,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        });
        this.map.zoomControl.setPosition('topright');

        // add marker
        this.marker = L.marker([this.state.tracks[0].lat, this.state.tracks[0].lon])
            .bindTooltip("Klemen Kenda", {
                permanent: true,
                direction: 'right'
            }).addTo(this.map);

        // add map image
        let imageUrl = '/maps/ljubljana-vic.jpg';
        /*
            46.049578, 14.4795
            46.049594, 14.498732 (2)
            46.040151, 14.498755
            46.040191, 14.47962 (1)
        */
        let imageBounds = [[46.040191, 14.47962], [46.049594, 14.498732]];
        this.mapImage = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);

        // updating
        this.countdown = setInterval(() => this.loadTracks(), 1000);
    }

    render() {
        this.updateMarkers();
        return <div id="map" style={{width: "100%", height: "100vh"}}></div>
    }

}

export default Live;