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

    // obsolete
    render2() {
        return <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} lg={6}>
                    <Form className="form-signin">
                        <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                        <div className="checkbox mb-3">
                            <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
                    </Form>
                </Col>
            </Row>
        </Container>
    }

}

export default Login;