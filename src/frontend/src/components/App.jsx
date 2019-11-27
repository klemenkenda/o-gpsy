import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ReactRouterPropTypes from "react-router-prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';

// bootstrap components
import { Container, Navbar, Nav, Form, /*FormControl,*/ Button } from 'react-bootstrap';

// components
import Home from "./Home";
import Live from "./Live";
import ProxyGPSRest from "./ProxyHTTPRest";

// CSS
import './App.css';

// types
type Props = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location
}
type State = { };

class App extends React.Component<Props, State> {
    render() {
        return [
            <Router>
                <Switch>
                    <Route path="/register/:u/:p/:x/:y/:t" component={ProxyGPSRest} />
                    <Route path="/" exact={true}>
                        <Navbar bg="dark" variant="dark">
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
                    </Route>
                </Switch>
            </Router>,
            <Router>
                <Switch>
                    <Route path="/" exact={true}>
                        <Container>
                            <Home />
                        </Container>
                    </Route>
                    <Route path="/live/:id">
                        <Live />
                    </Route>
                </Switch>
            </Router>,
            <Router>
                <Switch>
                    <Route path="/" exact={true}>
                        <footer className="text-muted pt-4" style={{borderTop: "1px solid #eee"}}>
                            <div className="container">
                                <p className="float-right">
                                    <a href="#home">Back to top</a>
                                </p>
                                <p>&copy;Klemen Kenda, IJS, E3</p>
                            </div>
                        </footer>
                    </Route>
                </Switch>
            </Router>
        ];
    }
}

export default App;
