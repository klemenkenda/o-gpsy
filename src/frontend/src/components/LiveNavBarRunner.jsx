// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class LiveNavBarRunner extends Component<Props, State> {

    render() {
        const runner_style = { borderLeft: "5px solid " + this.props.color, paddingLeft: "5px", marginTop: "4px" };
        return <div style={runner_style} onClick={() => this.props.handleToggleRunner(this.props.id)}>
            {this.props.name}
            <span className="spanRunnerClub">
                {this.props.club}, {this.props.country}
            </span>
        </div>
    }

}

export default LiveNavBarRunner;