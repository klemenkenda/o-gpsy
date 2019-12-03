// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents

// libraries
import Auth from '../lib/Auth';

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class Logout extends Component<Props, State> {

    componentDidMount() {
        Auth.unsetUser();
    }

    render() {
        return <div className="mt-5 mb-5">
            <h1>Log out</h1>
            You've been logged out.
        </div>
    }

}

export default Logout;