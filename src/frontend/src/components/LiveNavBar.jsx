// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents
import { Form } from 'react-bootstrap';

// import css
import './css/LiveNavBar.css';

// defining types
type Props = {};
type State = {};

/**
 * Displaying production lines list.
 */
class LiveNavBar extends Component<Props, State> {

    render() {
        return <div className="divLiveNavBar">
            <b>Options:</b>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Check type="checkbox" label="Show tail (5 min)" value={true}/>
                    <Form.Check type="checkbox" label="Show label" />
                </Form.Group>
            </Form>
        </div>
    }

}

export default LiveNavBar;