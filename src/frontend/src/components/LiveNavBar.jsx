// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents

// import css
import './css/LiveNavBar.css';

// defining types
type Props = { };
type State = {
    tail: boolean,
    labels: boolean,
    tail_length: number
};

/**
 * Displaying production lines list.
 */
class LiveNavBar extends Component<Props, State> {

    render() {
        return <div className="divLiveNavBar">
            <b>Options:</b><br/>

            <input
                type="checkbox"
                id="tail"
                checked={this.props.tail}
                onChange={ (e) => this.props.handleChange(e) } />
            Show tail<br />

            <input
                type="checkbox"
                id="labels"
                label="Show label"
                checked={this.props.labels}
                onChange={ (e) => this.props.handleChange(e) } />
            Show label
        </div>

    }

}

export default LiveNavBar;