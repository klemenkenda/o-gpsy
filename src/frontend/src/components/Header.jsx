// main imports
import React, { Component } from 'react';
import Auth from '../lib/Auth';

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
        const button = this.renderLoginButton();

        return <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">o-gpsy</Navbar.Brand>
            <Nav className="mr-auto">
                {/*
                <Nav.Link href="#home">Domov</Nav.Link>
                <Nav.Link href="#pricing">Najem</Nav.Link>
                */}
            </Nav>
            {button}
        </Navbar>
    }

    renderLoginButton() {
        if (Auth.checkUserShallow() === true) {
            const name = Auth.getUser().user;
            console.log(Auth.getUser());
            return <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <a href="/logout">{name}</a>
                </Navbar.Text>
            </Navbar.Collapse>
        } else {
            return <Form inline>
            {/*
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light" className="mr-sm-2">Search</Button>
            */}            
            <Button variant="outline-info" href="/login">Log In</Button>
        </Form>

        }
    }

}

export default Header;