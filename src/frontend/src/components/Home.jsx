// main imports
import React, { Component } from 'react';
// import { Router, Link } from 'react-router-dom';

// models

// backend

// import subcomponents

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class Live extends Component<Props, State> {

    render() {
        return <div className="mt-5">
            <h1>Events</h1>
            <ul>
                <li><a href="/live/1">Test event</a>, starts 27/11/2019@16:00 CET, tracking from 16:30</li>
            </ul>
        </div>
    }

}

export default Live;