// main imports
import React, { Component } from 'react';

// models

// backend
import { getBackend } from '../../lib/Backend';

// import subcomponents
import { Container, Table } from 'react-bootstrap';

// defining types
type Props = {};
type State = {
    log: any
};

/**
 * Displaying production lines list.
 */
class Logs extends Component<Props, State> {

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
        return <Container className="mt-5">
            <Table striped bordered hover>
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
                    this.state.log.reverse().map((row) => {
                        return <tr>
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
    }
}

export default Logs;