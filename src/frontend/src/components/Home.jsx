// main imports
import React, { Component } from 'react';
import { getBackend } from '../lib/Backend';
// import { Router, Link } from 'react-router-dom';

// models

// backend

// import subcomponents

// defining types
type Props = {};
type State = {
    events: Array<Object>
};

/**
 * Displaying production lines list.
 */
class Home extends Component<Props, State> {

    constructor() {
        super();

        this.state = {
            events: []
        }
    }

    componentDidMount() {
        getBackend().live.getEvents(
            (data) => {
                this.setState({ events: data});
            },
            (err) => {
                console.log(err);
            }
        )
    }
    render() {
        return <div className="mt-5">
            <h1>Events</h1>
            <ul>
                {
                    this.state.events.map((event, i) => {
                        let desc = "";
                        if (event.start !== null) {
                            desc = ", starts at " + new Date(event.start);
                        }
                        return <li key={i}>
                            <a href={"/live/" + event.id}>
                                {event.name}
                            </a>{ desc }
                        </li>;
                    })
                }
            </ul>
        </div>
    }

}

export default Home;