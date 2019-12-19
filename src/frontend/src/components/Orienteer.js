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
    constructor(live, i, props, map) {
        // remembering pointer to the Live component
        this.parent = live;

        // handling inherited props of a user
        this.props = props;
        this.track_data = this.props.track;
        this.i = i;

        // handling map related issues
        this.color = this.getColor(i);
        this.map = map;
        this.tail_length = 120; // TODO: this should be inherited from parent (used "live")

        this.last_show_labels = this.parent.state.show_labels;

        // render marker and tail
        this.initMarkerAndTail();
    }

    /**
     * Creates initial marker and track (tail) objects for a competitor.
     */
    initMarkerAndTail() {
        // add tail
        this.track = L.polyline([], { color: this.color, weight: 6, opacity: 0.8 }).addTo(this.map);
        this.updateTrack();
        // add marker
        this.marker = L.circleMarker([0, 0], { radius: 6, color: 'black', weight: 1, fillColor: this.color, fillOpacity: 1 })
            .bindTooltip(this.props.name, {
                permanent: this.parent.state.show_labels,
                direction: 'right',
                offset: new L.Point(10, 0)
            }).addTo(this.map);
    }

    /**
     * Updates marker. Currently called from Live component.
     */
    updateMarker() {
        if (this.marker) {
            let track_data = this.track_data;
            if (this.parent.state.action === 'replay') {
                track_data = track_data
                    .filter(x => x.ts <= this.parent.state.actionable_ts);

                console.log(track_data[track_data.length - 1]);
            }
            const len = track_data.length;
            if (len > 0) {
                let lat_lng = new L.LatLng(track_data[len - 1].lat, track_data[len - 1].lon);
                this.marker.setLatLng(lat_lng);
                this.track.addLatLng(lat_lng);
            }
        }
        // update tooltip
        if (this.last_show_labels !== this.parent.state.show_labels) {
            if (this.parent.state.show_labels === true) {
                this.marker.openTooltip();
            } else {
                this.marker.closeTooltip();
            }
            this.last_show_labels = this.parent.state.show_labels;
        }
    }

    /**
     * Updates track. Currently called from Live component.
     */
    updateTrack() {
        if (this.track_data.length > 0) {
            // fill track
            let tail_length = this.parent.state.tail_length;
            if (this.parent.state.show_tail === false) {
                tail_length = 0;
            }
            if (this.parent.state.show_track === true) {
                tail_length = 10 * 24 * 60 * 60;
            }
            let latlngsFilter = this.track_data
                .filter(x => x.ts > this.parent.state.actionable_ts - tail_length);

            if (this.parent.state.action === 'replay') {
                latlngsFilter = latlngsFilter
                    .filter(x => x.ts <= this.parent.state.actionable_ts);
            }

            const latlngs = latlngsFilter
                .map((el, i) => [el.lat, el.lon]);

            this.track.setLatLngs(latlngs);
        }
    }

    /**
     * Updates the internal track property with outside data.
     * @param {PointRecordObj} data New point data record.
     */
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
        }
    }

    /**
     * Returns the color of the marker/tail.
     * @param {number} i Number of the current competitor in the event.
     */
    getColor(i) {
        const colors = [
            'red',
            'blue',
            'green',
            'maroon',
            'yellow',
            'olive',
            'lime',
            'teal',
            'navy',
            'fuchsia',
            'purple',
            'silver',
        ];

        return colors[i % colors.length];
    }

}

export default Orienteer;