// main imports
import React, { Component } from 'react';

// models

// backend
import { getBackend } from '../lib/Backend';

// import subcomponents
import LiveNavBar from './LiveNavBar';
import Orienteer from './Orienteer.js';

// import libraries
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// defining types
type Props = { };

type State = {
    orienteers: [],
    competitors: [],
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

    constructor(props) {
        super(props);
        this.state = {
            orienteers: [],
            competitors: [],
            tracks: [],
            current_ts: 2147483647,
            labels: false,
            tail: true,
            tail_length: 60,
            show_track: false
        };
        this.orienteers = [];
    }

    loadTracks(event_id) {
        getBackend().live.getCoordinates(event_id,
            (data) => {
                if (this.orienteers.length === data.length) {
                    data.forEach((el, i) => {
                        this.orienteers[i].update(el);
                    });
                };
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
        this.orienteers.forEach((orienteer, i) => {
            orienteer.updateMarker();
            orienteer.updateTrack();
        });
    }

    componentDidMount() {
        // create a map
        this.map = L.map('map', {
            center: [46.510, 15.078],
            zoom: 15,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        });
        this.map.zoomControl.setPosition('topright');

        // add map image - Ljubljana-Vic
        let imageUrl = '/maps/ljubljana-vic.jpg';
        /*
            46.049578, 14.4795
            46.049594, 14.498732 (2)
            46.040151, 14.498755
            46.040191, 14.47962 (1)
        */
        let imageBounds = [[46.040191, 14.47962], [46.049594, 14.498732]];
        this.mapImage = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);


        imageUrl = '/maps/slovenj-gradec.jpg';
        imageBounds = [[46.505219, 15.072872], [46.515627, 15.08337]];
        this.mapImageSG = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);

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

        getBackend().live.getCompetitors(1,
            (data) => {
                this.orienteers = [];
                data.forEach((el, i) => {
                    console.log(el);
                    this.orienteers.push(new Orienteer(_self, i, el, this.map));
                });
                this.setState({ competitors: data, tracks: data[0].track });
            },
            (err) => {
                console.log("Error");
            }
        );

        // updating
        this.countdown = setInterval(() => this.loadTracks(), 1000);
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
                    show_labels={this.state.labels}
                    show_track={this.state.show_track}
                    tail_length={60} />
            </div>
        </div>
    }

}

export default Live;