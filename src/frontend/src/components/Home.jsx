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
                <li><a href="/live/1">ZL2 - Trofeja rimskega zidu (re-run)</a>, starts 30/11/2019@12:00 CET, tracking from 12:00</li>
            </ul>
        </div>
    }

}

export default Live;