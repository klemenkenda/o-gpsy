// main imports
import React, { Component } from 'react';

// models

// backend
import { getBackend } from '../../lib/Backend';

// import subcomponents

// defining types
type Props = {};
type State = {
    log: any
};

/**
 * Displaying production lines list.
 */
class Logs extends Component<Props, State> {

    componentDidMount() {
        this.loadLogs();
    }

    async loadLogs() {
        const log = await getBackend().admin.getLog(20);
        this.setState({ log: log});
    }

    render() {
        return <div>Template says: "Hello, world!"</div>
    }

}

export default Logs;