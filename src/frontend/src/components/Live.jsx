// main imports
import React, { Component } from 'react';

// models
import ReactRouterPropTypes from 'react-router-prop-types';

// backend
import { getBackend } from '../lib/Backend';

// import subcomponents
import LiveNavBar from './LiveNavBar';
import Orienteer from './Orienteer.js';

// import libraries
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// defining types
type Props = {
    match: ReactRouterPropTypes.match,
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location
};

type State = {
    orienteers: [],
    competitors: Object,
    tracks: [],
    current_ts: number,
    show_labels: boolean,
    show_tail: boolean,
    show_track: boolean,
    tail_length: number
};

/**
 * Displaying production lines list.
 */
class Live extends Component<Props, State> {

    constructor(props, state) {
        super(props);
        this.state = {
            orienteers: [],
            competitors: [],
            tracks: [],
            current_ts: 2147483647,
            show_labels: true,
            show_tail: true,
            tail_length: 60,
            show_track: false
        };
        this.orienteers = {};
    }

    loadTracks(event_id) {
        getBackend().live.getCoordinates(event_id,
            (data) => {
                data.forEach((el, i) => {
                    console.log(el);
                    this.orienteers[el.runner_id].update(el);
                });
            },
            (err) => {
                console.log("Error");
            }
        );

        getBackend().live.getTime(
            (data) => {
                this.setState({ current_ts: data });
            },
            (err) => {
                console.log(err);
            }
        );
    }

    updateMarkers() {
        Object.keys(this.orienteers).forEach((key) => {
            const orienteer = this.orienteers[key];
            orienteer.updateMarker();
            orienteer.updateTrack();
        });
    }

    componentDidMount() {
        this.event_id = this.props.match.params.id;

        let layers = [];

        if (new Date().getTime() / 1000 < (1575720480 - 12 * 60 * 60)) {
            layers = [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ]
        };

        // create a map
        this.map = L.map('map', {
            center: [46.510, 15.078],
            zoom: 15,
            layers: layers
        });
        this.map.zoomControl.setPosition('topright');

        // add map image - Ljubljana-Vic

        /*
            46.049578, 14.4795
            46.049594, 14.498732 (2)
            46.040151, 14.498755
            46.040191, 14.47962 (1)
        */
        let imageUrl = '/maps/ljubljana-vic.jpg';
        let imageBounds = [[46.040191, 14.47962], [46.049594, 14.498732]];
        this.mapImage = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);

        if (new Date().getTime() / 1000 > 1575720480 - 120) {
            imageUrl = '/maps/slovenj-gradec.jpg';
            imageBounds = [[46.505219, 15.072872], [46.515627, 15.08337]];
            this.mapImageSG = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
        }

        /*
        // add map image - Logaticum northern block
        imageUrl = '/maps/lom.jpg';
        imageBounds = [[45.889466, 14.245748], [45.902055, 14.256412]];
        this.mapImage2 = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);

        // add map of Moravce (Matic)
        imageUrl = '/maps/trening-matic.jpg';
        imageBounds = [[46.12459, 14.722344], [46.138434, 14.750768]];
        this.mapImage3 = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
        */

        let _self = this;

        getBackend().live.getCompetitors(this.event_id,
            (data) => {
                this.orienteers = [];
                data.forEach((el, i) => {
                    this.orienteers[el.id] = new Orienteer(_self, i, el, this.map);
                });
                this.setState({ competitors: data, tracks: data[0].track });
            },
            (err) => {
                console.log(err);
            }
        );

        // updating
        this.countdown = setInterval(() => this.loadTracks(this.event_id), 1000);
    }

    handleChange(event: Event) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            const field = target.id;
            const value = target.type === 'checkbox' ?
                target.checked : target.value;
            // update
            this.setState(prev_state => {
                prev_state[field] = value;
                return prev_state;
            });
        }
    };

    render() {
        this.updateMarkers();
        // this.updateTracks();
        return <div>
            <div id="map" style={{width: "100%", height: "100vh"}}>
                <LiveNavBar
                    handleChange={(e) => this.handleChange(e) }
                    show_tail={this.state.show_show_tail}
                    show_labels={this.state.show_labels}
                    show_track={this.state.show_track}
                    tail_length={this.state.tail_length} />
            </div>
        </div>
    }

}

export default Live;