// main imports
import React, { Component } from 'react';

// models

// backend

// import styles
import './css/Login.css';

// import subcomponents
import {
    Container, Row, Col,
    Form, Button
} from 'react-bootstrap';

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class Login extends Component<Props, State> {

    render() {
        return <Row className="mt-5">
            <Col lg={12} md={12} xs={12}>
                <Form className="form-signup">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            Username should be given to you by the administrator.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log in
                    </Button>
                </Form>
            </Col>
        </Row>
    }

}

export default Login;