// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents
import {
    Jumbotron, Container,
    ButtonToolbar, Button,
    Form, Col
} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import "../css/ReactDatepicker.css";
import DatePicker from 'react-datepicker';

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class AdminEventsAdd extends Component<Props, State> {

    constructor(props, state) {
        super(props, state);

        this.state = {
            action: "add",
            start: new Date(),
            end: "",
            active: true,
            public: true
        }
    }

    render() {
        return [
            <Jumbotron key={1} fluid>
                <Container>
                    <h1>Events: {this.state.action}</h1>
                    <ButtonToolbar>
                        <Button variant="info" href="/admin/events">List events</Button>
                    </ButtonToolbar>
                </Container>
            </Jumbotron>,
            <Container>
                <h3>Event Data</h3>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="title">
                            <Form.Label>Event title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Event title"
                                defaultValue={this.state.name}
                                onChange={e => this.setState({ name: e.target.value })} />
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="www">
                            <Form.Label>Event www</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Event web page"
                                defaultValue={this.state.www}
                                onChange={e => this.setState({ name: e.target.www })} />
                            <Form.Text className="text-muted">
                                Please use the form http://yoururl.com/something.
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md={6} controlId="start">
                            <Form.Label>Start time</Form.Label>
                            <DatePicker className="form-control" style={{"display": "block"}}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="yyyy-MM-dd @ HH:mm"
                                selected={this.state.start}
                                onChange={date => this.setState({ start: date })} />
                        </Form.Group>

                        <Form.Group as={Col} md={6} controlId="end">
                            <Form.Label>End time</Form.Label>
                            <DatePicker className="form-control" style={{"display": "block"}}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="yyyy-MM-dd @ HH:mm"
                                selected={this.state.end}
                                onChange={date => this.setState({ end: date })} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="mt-3">
                        <Form.Group as={Col} md={12} controlId="checkboxes1">
                        <Form.Check
                            type="switch"
                            id="active"
                            label="Active"
                            checked={this.state.active}
                            onChange={x => this.setState({ active: x.target.checked })}
                        />
                        </Form.Group>
                        <Form.Group as={Col} md={12} controlId="checkboxes2">
                        <Form.Check
                            type="switch"
                            size="lg"
                            label="Public"
                            id="public"
                            checked={this.state.public}
                            onChange={x => this.setState({ public: x.target.checked })}
                        />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md={12} controlId="maps">
                            <h3>Map</h3>

                            <Button variant="success" type="submit">Save event data</Button>

                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>,
            <Container>
                <h3>Runners</h3>
            </Container>
        ]
    }

}

export default AdminEventsAdd;