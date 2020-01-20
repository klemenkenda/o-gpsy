// main imports
import React, { Component } from 'react';
import { getBackend } from '../lib/Backend';
// import { Router, Link } from 'react-router-dom';

// models

// backend

// import subcomponents
import {
    Container,
    Jumbotron
} from 'react-bootstrap';

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
        return [
            <Jumbotron key={1} fluid>
                <Container>
                    <h1>Schedule &amp; History</h1>
                    <p>
                        Live tracking for Slovenian Orienteering Federation.
                    </p>
                </Container>
            </Jumbotron>,
            <Container key={2}>
                <ul>
                    {
                        this.state.events.reverse().map((event, i) => {
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
            </Container>
        ]
    }

}

export default Home;