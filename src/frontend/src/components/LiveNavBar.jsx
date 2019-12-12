// main imports
import React, { Component } from 'react';
import { lZ } from '../lib/Utils';

// models

// backend

// import subcomponents

// import css
import './css/LiveNavBar.css';

// defining types
type Props = { };
type State = { };

/**
 * Displaying production lines list.
 */
class LiveNavBar extends Component<Props, State> {

    convertTs2Time(ts: number) {
        let d = new Date(ts * 1000);
        return lZ(d.getHours()) + ":" + lZ(d.getMinutes()) + ":" + lZ(d.getSeconds());
    }

    render() {
        return <div className="divLiveNavBar">
            <b>Options:</b><br/>

            <input
                type="checkbox"
                id="show_tail"
                checked={this.props.show_tail}
                onChange={ (e) => this.props.handleChange(e) } />
            Show tail (60s)<br />

            <input
                type="checkbox"
                id="show_track"
                checked={this.props.show_track}
                onChange={ (e) => this.props.handleChange(e) } />
            Show track<br />

            <input
                type="checkbox"
                id="show_labels"
                label="Show label"
                checked={this.props.show_labels}
                onChange={ (e) => this.props.handleChange(e) } />
            Show labels
            <br />
            <button onClick={this.props.setReplayState}>Replay</button>
            <button onClick={this.props.setLiveState}>Live</button>
            <br />
            { this.convertTs2Time(this.props.timestamp) }
            <br />
            <button onClick={this.props.startStopReplay}>Start/Stop</button>
        </div>

    }

}

export default LiveNavBar;