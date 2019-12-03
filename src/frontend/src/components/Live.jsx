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
    labels: boolean,
    tail: boolean,
    tailLength: number
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
            tailLength: 60
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
            center: [46.131, 14.736],
            zoom: 16,
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

        // add map image - Logaticum northern block
        imageUrl = '/maps/lom.jpg';
        /*
            45.902115_14.24592_
            45.902055_14.256412_
            45.889392_14.256262_
            45.889466_14.245748
        */
        imageBounds = [[45.889466, 14.245748], [45.902055, 14.256412]];
        this.mapImage2 = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);

        imageUrl = '/maps/trening-matic.jpg';
        /*
            46.138409_14.722319
            46.138434_14.750768
            46.124615_14.750793
            46.12459_14.722344
        */
        imageBounds = [[46.12459, 14.722344], [46.138434, 14.750768]];
        this.mapImage3 = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);

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
                    tail={this.state.tail}
                    labels={this.state.labels}
                    tailLength={60} />
            </div>
        </div>
    }

}

export default Live;