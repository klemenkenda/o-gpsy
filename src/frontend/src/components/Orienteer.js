// main imports
// import React from 'react';

// models

// backend

// import subcomponents

// import libraries
import L from 'leaflet';

// defining types

/**
 * Handling an orienteer.
 */
class Orienteer {
    constructor(props, map) {
        console.log("New orienteer!");
        this.props = props;
        this.map = map;
        this.track_data = this.props.track;
        
        this.initMarkerAndTail();
    }

    initMarkerAndTail() {        
        // add tail
        this.track = L.polyline([], { color: 'red', weight: 6, opacity: 0.8 }).addTo(this.map);
        // add marker
        this.marker = L.circleMarker([0, 0], { radius: 6, color: "black", weight: 1, fillColor: "red", fillOpacity: 1 })
            .bindTooltip(this.props.name, {
                permanent: false,
                direction: 'right',
                offset: new L.Point(10, 0)
            }).addTo(this.map);
    }

    updateMarker() {
        if (this.marker) {            
            const len = this.track_data.length;
            if (len > 0) {
                let lat_lng = new L.LatLng(this.track_data[len - 1].lat, this.track_data[len - 1].lon);
                this.marker.setLatLng(lat_lng);
                this.track.addLatLng(lat_lng);
            }
        }
    }

    update(data) {        
        // this is acctually pointer
        let track = this.track_data;
        if (track.length > 0) {
            if (track[track.length - 1].ts) {
                if (track[track.length - 1].ts !== data.ts) {
                    track.push(data);
                }
            }
        } else {            
            track.push(data);
        };
    }

}

export default Orienteer;