// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents
import { Navbar, Nav, Form, /*FormControl,*/ Button } from 'react-bootstrap';

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class Header extends Component<Props, State> {

    render() {
        return <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">o-gpsy</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Domov</Nav.Link>
                <Nav.Link href="#pricing">Najem</Nav.Link>
            </Nav>
            <Form inline>
                {/*
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light" className="mr-sm-2">Search</Button>
                */}
                <Button variant="outline-info">Log In</Button>
            </Form>
        </Navbar>
    }

}

export default Header;