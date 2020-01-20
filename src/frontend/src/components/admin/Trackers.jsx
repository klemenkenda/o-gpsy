// main imports
import React, { Component } from 'react';
import {
    Container,
    Table,
    Jumbotron,
    ButtonToolbar, Button,
    Modal,
    Form
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
            trackerToDeleteId: -1,
            hw: "TMT250",
            name: "",
            uuid: "",
            validated: false,
            selected: -1
        }
        this.backend = getBackend().admin;
    }

    async componentDidMount() {
        // set default action
        this.action = "list";
        if (this.props.match.params.action) {
            this.action = this.props.match.params.action;
        }
        if (!isNaN(this.action)) {
            this.setState({
                selected: parseInt(this.action)
            });
            this.action = "edit";
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


    // -------------------------
    // list/delete tracker functions
    // -------------------------

    deleteTrackerStart(id) {
        this.setState({
            showDeleteModal: true,
            trackerToDeleteId: id
        })
    }

    editTrackerStart(id) {
        this.action = "edit";
        this.props.history.push(`/admin/trackers/${id}`);
        // obtain tracker data
        const tracker = this.state.trackers.filter(x => x.id === id)[0];
        this.setState({
            action: "edit",
            selected: id,
            hw: tracker.hw,
            name: tracker.name,
            uuid: tracker.uuid
        });
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
                            handleToEdit={(id) => this.editTrackerStart(id)}
                        />;
                    })
                }
                </tbody>
            </Table>
        </>
    }



    // -------------------------
    // add/edit tracker functions
    // -------------------------

    async addOrUpdateTracker(e) {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity()) {
            try {
                if (this.action === "add") {
                    await this.backend.addTracker({ hw: this.state.hw, uuid: this.state.uuid, name: this.state.name });
                } else if (this.action === "edit") {
                    console.log(await this.backend.updateTracker({ id: this.state.selected, hw: this.state.hw, uuid: this.state.uuid, name: this.state.name }));
                }
                this.action = "list";
                this.props.history.push("/admin/trackers");
                this.loadTrackers();
            } catch (err) {
                console.log(err);
            }
        };

        this.setState({ validated: true });
    }

    renderForm() {
        return <Form noValidate validated={this.state.validated} onSubmit={(e) => this.addOrUpdateTracker(e)}>
            <Form.Group controlId="hw">
                <Form.Label>Hardware</Form.Label>
                <Form.Control as="select" defaultValue={this.state.hw} onChange={e => this.setState({ hw: e.target.value })}>
                    <option>TMT250</option>
                    <option>Android Phone (GPSLogger)</option>
                </Form.Control>
                <Form.Text className="text-muted">
                    Select the type of the device you are registering.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="uuid">
                <Form.Label>Device UUID</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter UUID"
                    defaultValue={this.state.uuid}
                    onChange={e => this.setState({ uuid: e.target.value })}
                    feedback="Please enter a valid UUID."/>
                <Form.Text className="text-muted">
                    IMEI for TMT250, phxxx for phone.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Enter name"
                    defaultValue={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })} />
                <Form.Text className="text-muted">
                    Your internal name for the device, i.e. TMTxxx.
                </Form.Text>
            </Form.Group>
            { (this.action === "add" ) && <Button variant="success" type="submit">
                Create new tracker
            </Button>}

            { (this.action === "edit" ) && <Button variant="warning" type="submit">
                Edit tracker
            </Button>}

        </Form>
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
                {
                    (this.action === "add") && this.renderForm()
                }
                {
                    (this.action === "edit") && this.renderForm()
                }
            </Container>
        ]
    }

}

export default Trackers;