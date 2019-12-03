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
            <Router key={1}>
                <Switch>
                    <Route path="/(|login|logout)" exact={true} key={1}>
                        <Header />
                    </Route>                    
                </Switch>
            </Router>,
            <Router key={2}>
                <Switch>
                    <Route path="/" exact={true} key={1}>
                        <Container>
                            <Home />
                        </Container>
                    </Route>
                    <Route path="/login" key={2}>
                        <Container>
                            <Login />
                        </Container>
                    </Route>
                    <Route path="/logout" key={3}>
                        <Container>
                            <Login />
                        </Container>
                    </Route>
                    <Route path="/live/:id" key={4}>
                        <Live />
                    </Route>
                </Switch>
            </Router>,
            <Router key={3}>
                <Switch>
                    <Route path="/(|login|logout)" exact={true} key={1}>
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
