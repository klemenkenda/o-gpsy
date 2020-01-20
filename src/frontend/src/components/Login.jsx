// main imports
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import Auth from '../lib/Auth';

// models
import { getBackend } from '../lib/Backend';

// backend

// import styles
import './css/Login.css';

// import subcomponents
import {
    Row, Col,
    Form, Button
} from 'react-bootstrap';
import Error from './Error';

// defining types
type Props = {};
type State = {
    username: string,
    password: string,
    remember: boolean,
    logged_in: boolean,
    warning: string
};

/**
 * Displaying production lines list.
 */
class Login extends Component<Props, State> {
    constructor(props, state) {
        super(props, state);
        this.state = {
            username: "",
            password: "",
            remember: false,
            logged_in: false,
            warning: ""
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

    handleSubmit(e) {
        e.preventDefault();
        const username = this.state.username;
        const password = MD5(this.state.password.trim());
        const remember = this.state.remember;

        getBackend().admin.login(username, password,
            (data) => {
                if (typeof data === "object") {
                    if (data.length > 0) {
                        Auth.setUser(data[0], remember);
                        this.setState({ logged_in: true });
                    } else {
                        // user not found
                        this.setState({ warning: "User not found!" });
                    }
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    render() {
        if (this.state.logged_in) {
            window.location.href = "/";
        }

        return <Row className="mt-5 mb-5">
            <Col lg={12} md={12} xs={12}>
                <Error msg={this.state.warning} type="warning" />
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
                    <Form.Group controlId="remember">
                        <Form.Check
                            type="checkbox"
                            label="Remember me"
                            value={this.state.remember}
                            onChange={ (e) => this.handleChange(e) } />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => this.handleSubmit(e)}>
                        Log in
                    </Button>
                </Form>
            </Col>
        </Row>
    }

}

export default Login;