import React from 'react';
import { 
    BrowserRouter as Router, 
    Switch,
    Route,
    Link,
    Redirect 
} from "react-router-dom";

import ReactRouterPropTypes from "react-router-prop-types";

// components
import Home from "./Home";
import Live from "./Live";

// CSS
import './App.css';

// types
type Props = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location
}
type State = { };

class App extends React.Component<Props, State> {
    constructor() {
        super();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact={true}>
                        <Home />
                    </Route>                
                    <Route path="/live/:id">
                        <Live />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
