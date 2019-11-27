// main imports
import React, { Component } from 'react';

// models

// backend
import { getBackend } from '../lib/Backend';

// import subcomponents

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class ProxyHTTPRest extends Component<Props, State> {

    render() {
        const u = this.props.match.params.u;
        const p = this.props.match.params.p;
        const x = this.props.match.params.x;
        const y = this.props.match.params.y;
        const t = this.props.match.params.t;

        getBackend().live.putCoordinates(u, p, x, y, t, () => {}, (err) => { console.log(err); } );

        return <div>OK</div>
    }

}

export default ProxyHTTPRest;