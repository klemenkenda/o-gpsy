// main imports
import React, { Component } from 'react';
import {
    Container,
    Table,
    Jumbotron,
    ButtonToolbar, Button
} from 'react-bootstrap';
import TableRow from './TableRow';

// models

// backend
import { getBackend } from '../../lib/Backend';

// import subcomponents

/**
 * Displaying production lines list.
 */
class Trackers extends Component {

    constructor() {
        super();
        this.backend = getBackend().admin;
    }

    async componentDidMount() {
        // set default action
        this.action = "list";
        if (this.props.match.params.action) {
            this.action = this.props.match.params.action;
        }

        try {
            let trackers = await this.backend.getTrackers();
            this.setState({
                trackers: trackers
            });
        } catch (err) {
            console.log(err);
        }

    }

    renderList() {
        return <Table striped bordered hover responsive="sm">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Hardware</th>
                    <th>Name</th>
                    <th>Uuid / IMEI</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                this.state.trackers.map((el, i) => {
                    return <TableRow
                        key={i}
                        id={el.id}
                        obj={el}
                        columns={['hw', 'name', 'uuid']}
                        showAction={true}
                    />;
                })
            }
            </tbody>
        </Table>
    }

    render() {
        return [
            <Jumbotron key={1} fluid>
                <Container>
                    <h1>Trackers: {this.action}</h1>
                    <ButtonToolbar>
                        {
                            (this.action === "list") && <Button variant="success" href="/admin/trackers/add">Add new tracker</Button>
                        }
                        {
                            (this.action !== "list") && <Button variant="info" href="/admin/trackers">List trackers</Button>
                        }
                    </ButtonToolbar>
                </Container>
            </Jumbotron>,
            <Container key={2} className="mt-5">
                {
                    (this.action === "list") && this.renderList()
                }
            </Container>
        ]
    }

}

export default Trackers;