// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents

// import libraries
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class Live extends Component<Props, State> {

    componentDidMount() {
        console.log("Here");
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
    }

    render() {
        return <div id="map" style={{width: "100%", height: "100vh"}}></div>
    }

}

export default Live;