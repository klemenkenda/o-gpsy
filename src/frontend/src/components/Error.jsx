// react
import React, { Component } from 'react';

// models

// subcomponents

// types
type Props = {
    msg: string,
    type: string
};

type State = {
    message: string,
    type: string
};

/**
 * Error banner in CRUD components.
 */
class Error extends Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props);
        this.state = {
            message: props.msg,
            type: props.type
        }
    }

    UNSAFE_componentWillReceiveProps(props: Props) {
        // update state with new props
        this.setState({ message: props.msg });
    }

    render() {
        let typeClass: string = "alert-danger";
        if (this.state.type === "warning") {
            typeClass = "alert-warning";
        };

        if (this.state.type === "success") {
            typeClass = "alert-success";
        }

        if (this.state.message !== "") {
            return(
                <div className="row">
                    <div className="col-md-12">
                        <div className={"alert " + typeClass}>
                            { this.state.message }
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

export default Error;