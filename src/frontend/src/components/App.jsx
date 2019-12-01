import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ReactRouterPropTypes from "react-router-prop-types";
import 'bootstrap/dist/css/bootstrap.min.css';

// bootstrap components
import { Container } from 'react-bootstrap';

// components
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import Live from "./Live";
import ProxyGPSRest from "./ProxyHTTPRest";

// CSS
import './css/App.css';

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
                        <Header />
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
                    <Route path="/login">
                        <Container>
                            <Login />
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
