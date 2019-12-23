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
    actionable_ts: number,
    show_labels: boolean,
    show_tail: boolean,
    show_track: boolean,
    tail_length: number,
    action: string,
    start_ts: number
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
            actionable_ts: 2147483647,
            show_labels: true,
            show_tail: true,
            tail_length: 60,
            show_track: false,
            action: "live"
        };
        this.orienteers = {};
    }

    loadTracks(event_id) {
        getBackend().live.getCoordinates(event_id,
            (data) => {
                data.forEach((el, i) => {
                    this.orienteers[el.runner_id].update(el);
                });
            },
            (err) => {
                console.log("Error");
            }
        );

        getBackend().live.getTime(
            (data) => {
                if (this.state.action === "replay") {
                    this.setState({ current_ts: data });
                } else if (this.state.action === "live") {
                    this.setState({ current_ts: data, actionable_ts: data });
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    updateOrienteers() {
        Object.keys(this.orienteers).forEach((key) => {
            const orienteer = this.orienteers[key];
            orienteer.updateMarker();
            orienteer.updateTrack();
        });
    }

    setLiveState(state: string) {
        if (state === "replay") {
            this.setState({
                action: state,
                actionable_ts: this.state.start_ts
            });
        } else {
            this.setState({
                action: state,
                actionable_ts: this.state.current_ts
            });
        }
    }

    updateActionableTimer() {
        this.setState({
            actionable_ts: this.state.actionable_ts + 1
        })
    }

    startStopReplay() {
        if (this.state.action === "replay") {
            if (this.actionableTimer) {
                clearInterval(this.actionableTimer);
                this.actionableTimer = null;
            } else {
                this.actionableTimer = setInterval(() => this.updateActionableTimer(), 100);
            }
        } else {
            alert("Should be in replay mode!");
        }
    }

    async componentDidMount() {
        this.event_id = this.props.match.params.id;

        try {
            let event = await getBackend().live.getEvent(this.event_id);
            console.log(event);

            // calculate map bounds
            const coordinates_numbers = event.map.coordinates.split("_").map(x => { return parseFloat(x)});
            let coordinates = [];
            while(coordinates_numbers.length) coordinates.push(coordinates_numbers.splice(0,2));

            // calculate centre
            let view_center = [
                coordinates.reduce((a, b) => { return a.length === 2 ? a[0] + b[0] : a + b[0]}) / coordinates.length,
                coordinates.reduce((a, b) => { return a.length === 2 ? a[1] + b[1] : a + b[1]}) / coordinates.length
            ]

            let layers = [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ];

            // create a map
            this.map = L.map('map', {
                center: view_center,
                zoom: 15,
                layers: layers
            });
            this.map.zoomControl.setPosition('topright');

            // add map image dynamically
            let imageUrl = '/maps/' + event.map.filename;
            let imageBounds = [coordinates[3], coordinates[1]];
            this.mapImageDB = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);

            /*
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

            // set state
            let start_ts = new Date(event.start).getTime() / 1000;
            this.setState({ start_ts: start_ts });

            // updating
            this.countdown = setInterval(() => this.loadTracks(this.event_id), 1000);
        } catch (e) {
            console.log(e);
            throw e;
        }

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
        this.updateOrienteers();

        return <div>
            <div id="map" style={{width: "100%", height: "100vh"}}>
                <LiveNavBar
                    handleChange={ (e) => this.handleChange(e) }
                    setReplayState={ () => this.setLiveState("replay") }
                    setLiveState={ () => this.setLiveState("live") }
                    startStopReplay={ () => this.startStopReplay() }
                    show_tail={this.state.show_tail}
                    show_labels={this.state.show_labels}
                    show_track={this.state.show_track}
                    tail_length={this.state.tail_length}
                    orienteers={this.orienteers}
                    timestamp={this.state.actionable_ts} />
            </div>
        </div>
    }

}

export default Live;