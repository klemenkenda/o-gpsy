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

        console.log(localStorage.getItem('user'));

        this.state = {
            logged_in: false
        }
    }

    shouldComponentUpdate() {
        const logged_in = Auth.checkUserShallow();
        console.log(logged_in);
        if (this.state.logged_in === logged_in) return(false);
        return(true);
    }

    checkUser() {
        const logged_in = Auth.checkUserShallow();
        this.setState({ logged_in: logged_in });
    }

    componentDidMount() {
        this.checkUser();

        window.addEventListener('storage', (e) => {
            console.log(e);
            this.checkUser();
            console.log("xxx");
        });
    }

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