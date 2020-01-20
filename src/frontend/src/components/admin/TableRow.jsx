import * as React from 'react';

// defining types
type Props = {
    id: number,
    obj: any,
    handleToUpdate: any,
    handleToError: any,
    handleToDelete: any,
    editLink?: string,
    columns: string[],
    showAction: boolean
}

class TableRow extends React.Component<Props> {
    /**
     * Handler for deleting the row.
     */
    delete = () => {
        this.props.handleToDelete(this.props.obj.id);
    }

    /**
     * Handler for deleting the row.
     */
    edit = () => {
        this.props.handleToEdit(this.props.obj.id);
    }

    /**
     * Rendering JSX for current component.
     */
    render() {
        return <tr>
            <td>{this.props.obj.id}</td>
            {
                this.props.columns.map((el, i) => {
                    return (
                        <td key={i}>
                            {this.props.obj[el]}
                        </td>
                    )
                })
            }
            {
                this.props.showAction &&
                <td>
                    <button onClick={this.edit} className="btn btn-primary">Edit</button>&nbsp;
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            }
        </tr>;

    }
}

export default TableRow;