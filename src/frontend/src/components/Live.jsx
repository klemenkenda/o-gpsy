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
    current_ts: number
};

/**
 * Displaying production lines list.
 */
class Live extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            competitors: [],
            tracks: [],
            current_ts: 0
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
                /*
                let track = this.state.tracks;
                if (track.length > 0) {
                    if (track[track.length - 1].ts) {
                        if (track[track.length - 1].ts !== data.ts) {
                            track.push(data);
                        }
                    }
                } else {
                    track.push(data);
                };

                this.setState({ tracks: track }, this.componentDidUpdate);
                */
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
        });
        
        /*
        if (this.marker) {
            const len = this.state.tracks.length;
            if (len > 0) {
                let lat_lng = new L.LatLng(this.state.tracks[len - 1].lat, this.state.tracks[len - 1].lon);
                this.marker.setLatLng(lat_lng);
                this.track.addLatLng(lat_lng);
            }
        }
        */
    }

    updateTracks() {
        if (this.state.tracks.length > 0) {
            // fill track
            let latlngs = this.state.tracks
                .filter(x => x.ts > this.state.current_ts - 300)
                .map((el, i) => [el.lat, el.lon]);
            this.track.setLatLngs(latlngs);
        }
    }

    componentDidMount() {
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

        // add map image
        // let imageUrl = '/maps/ljubljana-vic.jpg';
        /*
            46.049578, 14.4795
            46.049594, 14.498732 (2)
            46.040151, 14.498755
            46.040191, 14.47962 (1)
        */
        /*
        let imageBounds = [[46.040191, 14.47962], [46.049594, 14.498732]];
        this.mapImage = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
        */

        getBackend().live.getCompetitors(1,
            (data) => {
                this.orienteers = [];
                data.forEach((el, i) => {
                    console.log(el);
                    this.orienteers.push(new Orienteer(el, this.map));
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

    render() {
        this.updateMarkers();
        // this.updateTracks();
        return <div>
            <div id="map" style={{width: "100%", height: "100vh"}}>
            <LiveNavBar />
            </div>
        </div>
    }

}

export default Live;