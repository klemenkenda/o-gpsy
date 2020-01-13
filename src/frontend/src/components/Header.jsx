// main imports
import React, { Component } from 'react';
import Auth from '../lib/Auth';

// models

// backend

// import subcomponents
import { Navbar, Nav, Form, /*FormControl,*/ Button } from 'react-bootstrap';

// defining types
type Props = {};
type State = {
    logged_in: boolean
};

/**
 * Displaying production lines list.
 */
class Header extends Component<Props, State> {

    constructor(props, state) {
        super();

        this.state = {
            logged_in: false
        }
    }

    shouldComponentUpdate() {
        const logged_in = Auth.checkUserShallow();
        if (this.state.logged_in === logged_in) return(false);
        return(true);
    }

    checkUser() {
        const logged_in = Auth.checkUserShallow();
        this.setState({ logged_in: logged_in });
    }

    componentDidMount() {
        this.checkUser();
    }

    render() {
        const button = this.renderLoginButton();

        return <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">o-gpsy</Navbar.Brand>
            { this.state.logged_in &&
                <Nav className="mr-auto">
                    <Nav.Link href="/admin/events">Events</Nav.Link>
                    <Nav.Link href="/admin/trackers">Trackers</Nav.Link>
                    <Nav.Link href="/admin/maps">Maps</Nav.Link>
                    <Nav.Link href="/admin/logs">Logs</Nav.Link>
                </Nav>
            }
            { !this.state.logged_in &&
                <Nav className="mr-auto">
                </Nav>
            }
            {button}
        </Navbar>
    }

    renderLoginButton() {
        if (this.state.logged_in === true) {
            const name = Auth.getUser().user;

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