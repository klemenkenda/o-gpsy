// main imports
import React, { Component } from 'react';
import {
    Container,
    Table,
    Jumbotron,
    ButtonToolbar, Button,
    Modal
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
        this.state = {
            showDeleteModal: false,
            trackerToDeleteId: -1
        }
        this.backend = getBackend().admin;
    }

    async componentDidMount() {
        // set default action
        this.action = "list";
        if (this.props.match.params.action) {
            this.action = this.props.match.params.action;
        }
        await this.loadTrackers();
    }

    async loadTrackers() {
        try {
            let trackers = await this.backend.getTrackers();
            this.setState({
                trackers: trackers
            });
        } catch (err) {
            console.log(err);
        }

    }

    deleteTrackerStart(id) {
        this.setState({
            showDeleteModal: true,
            trackerToDeleteId: id
        })
    }

    async deleteTracker() {
        try {
            const id = this.state.trackerToDeleteId;
            console.log(await this.backend.deleteTracker(id));
            this.setState({
                showDeleteModal: false
            })
            this.loadTrackers();
        } catch (err) {
            console.log(err);
        }
    }

    handleClose() {
        this.setState({
            showDeleteModal: false
        })
    }

    renderList() {
        return <>
            <Modal show={this.state.showDeleteModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete the tracker?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        No
                    </Button>
                    <Button variant="danger" onClick={() => this.deleteTracker()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Table striped bordered hover responsive="sm">
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
                            handleToDelete={(id) => this.deleteTrackerStart(id)}
                        />;
                    })
                }
                </tbody>
            </Table>
        </>
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