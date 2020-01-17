import * as React from 'react';
import { Link } from 'react-router-dom';

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
     * Rendering JSX for current component.
     */
    render() {
        let editLink = this.props.editLink + this.props.obj.id;
        return <tr>
            <td>{this.props.id + 1}</td>
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
                <td style={{textAlign: 'right' }}>
                    <Link to={editLink} className="btn btn-outline-primary">Edit</Link>&nbsp;
                    <button onClick={this.delete} className="btn btn-outline-secondary">Delete</button>
                </td>
            }
        </tr>;

    }
}

export default TableRow;