// main imports
import React, { Component } from 'react';

// models

// backend
import { getBackend } from '../../lib/Backend';

// import subcomponents
import { Container, Table, Jumbotron } from 'react-bootstrap';

/**
 * Displaying production lines list.
 */
class Logs extends Component {

    constructor(state) {
        super(state);
        this.state = {
            log: []
        }
    }

    componentDidMount() {
        this.loadLogs();
        // updating
        this.sheduler = setInterval(() => this.loadLogs(), 1000);
    }

    async loadLogs() {
        const log = await getBackend().admin.getLog(20);
        this.setState({ log: log});
    }

    render() {
        return [
            <Jumbotron key={1} fluid>
                <Container>
                    <h1>Logs</h1>
                    <p>
                        Last records in the database from trackers.
                    </p>
                </Container>
            </Jumbotron>,
            <Container key={2} className="mt-5">
                <Table striped bordered hover size="sm" responsive="sm">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Runner id</th>
                            <th>Lat</th>
                            <th>Lon</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.log.reverse().map((row, i) => {
                            return <tr key={i}>
                                <td>{row.ts}</td>
                                <td>{row.runner_id}</td>
                                <td>{row.lat}</td>
                                <td>{row.lon}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
            </Container>
        ]
    }
}

export default Logs;