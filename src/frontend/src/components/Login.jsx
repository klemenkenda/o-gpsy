// main imports
import React, { Component } from 'react';

// models

// backend

// import styles
import './css/Login.css';

// import subcomponents
import {
    Row, Col,
    Form, Button
} from 'react-bootstrap';

// defining types
type Props = {};
type State = {
    username: string,
    password: String
};

/**
 * Displaying production lines list.
 */
class Login extends Component<Props, State> {
    constructor(props, state) {
        super(props, state);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange(event: Event) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            const field = target.id;
            const value = target.type === 'checkbox' ?
                target.checked : target.value;
            // update
           this.setState(prev_state => {
               prev_state[field] = value;
               return prev_state;
           });
        }
    };

    render() {
        return <Row className="mt-5">
            <Col lg={12} md={12} xs={12}>
                <Form>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" 
                            placeholder="Enter username" 
                            value={this.state.username} 
                            onChange={ (e) => this.handleChange(e) }/>
                        <Form.Text className="text-muted">
                            Username should be given to you by the administrator.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={this.state.password}
                            onChange={ (e) => this.handleChange(e) } />
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