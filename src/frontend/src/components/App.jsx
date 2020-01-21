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
import Logout from "./Logout";

// admin components
import AdminEvents from "./admin/Events";
import AdminEventAdd from "./admin/Events_Add";
import AdminEventEdit from "./admin/Events_Edit";
import AdminMaps from "./admin/Maps";
import AdminLogs from "./admin/Logs";
import AdminTrackers from "./admin/Trackers";

// CSS
import './css/App.css';

// types
type Props = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location
}
type State = {};

class App extends React.Component<Props, State> {
    render() {
        return [
            <Router key={1}>
                <Switch>
                    <Route path="/(|login|logout|admin/maps|admin|admin/events|admin/event|admin/logs|admin/trackers)" key={1}>
                        <Header />
                    </Route>
                </Switch>
            </Router>,
            <Router key={2}>
                <Switch>
                    <Route path="/" exact={true} key={1}>
                        <Home />
                    </Route>
                    <Route path="/login" key={2}>
                        <Container>
                            <Login />
                        </Container>
                    </Route>
                    <Route path="/logout" key={3}>
                        <Container>
                            <Logout />
                        </Container>
                    </Route>
                    <Route path="/live/:id" key={4} component={Live} />
                    <Route path="/admin" exact={true} key={50} component={AdminEvents} />
                    <Route path="/admin/events" key={60} exact={true} component={AdminEvents} />
                    <Route path="/admin/events/add" key={61} component={AdminEventAdd} />
                    <Route path="/admin/event/:id" key={61} component={AdminEventEdit} />
                    <Route path="/admin/trackers/:action" key={90} component={AdminTrackers} />
                    <Route path="/admin/trackers" key={90} component={AdminTrackers} />
                    <Route path="/admin/logs" key={80} component={AdminLogs} />
                    <Route path="/admin/maps" exact={true} key={70}>
                        <AdminMaps />
                    </Route>
                </Switch>
            </Router>,
            <Router key={3}>
                <Switch>
                    <Route path="/(|login|logout|maps)" exact={true} key={1}>
                        <footer className="text-muted pt-4" style={{ borderTop: "1px solid #eee" }}>
                            <div className="container">
                                <p className="float-right">
                                    <a href="#home">Back to top</a>
                                </p>
                                <p>&copy; Klemen Kenda &amp; Andrej Borštnik, IJS, E3</p>
                            </div>
                        </footer>
                    </Route>
                </Switch>
            </Router>
        ];
    }
}

export default App;
