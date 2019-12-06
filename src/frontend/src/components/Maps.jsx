import React, { Component } from 'react';

import { getBackend } from '../lib/Backend';

import {
    Row,
    Col,
    Button,
    Form,
} from 'react-bootstrap';

type Props = {};
type State = {
    maps: Array
};

class Maps extends Component<Props, State> {
    constructor(props, state) {
        super(props, state);
        this.state = {
            maps: [],
            newMap: {},
            addingMap: false,
            editedMap: {},
        };
        this.backend = getBackend().admin;
    };

    componentDidMount() {
        this.updateMaps();
    };

    async updateMaps() {
        let maps = await this.backend.getMaps();
        this.setState({ maps });
    };

    async addMap() {
        let map = await this.backend.addMap(this.state.newMap);
        await this.updateMaps(); // todo delete map in place instead of re-fetching
        this.toggleAddingMap();
    };

    toggleAddingMap() {
        this.setState((state) => ({ addingMap: !state.addingMap }));
    };

    async editMap() {
        let map = await this.backend.editMap(this.state.editedMap);
        this.toggleEditMap(map)
        await this.updateMaps(); // todo update map in place instead of re-fetching
    };

    toggleEditMap(map) {
        if (this.state.editedMap.id !== map.id) return this.setState({ editedMap: map });
        return this.setState({ editedMap: {} });
    }

    async deleteMap(map) {
        map = await this.backend.deleteMap(map.id);
        await this.updateMaps(); // todo delete map in place instead of re-fetching
    };

    handleAddFormChange(event: Event) {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            const { id, value, type, files } = target;
            let payload = { [id]: value };

            if (type === 'file') {
                payload[id] = files && files[0] && files[0].name;
                payload.file = files && files[0];
            }

            this.setState((state) => ({
                newMap: {
                    ...state.newMap,
                    ...payload,
                },
            }));
        }
    };

    handleEditFormChange(event: Event) {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            const { id, value, type, files } = target;
            let payload = { [id]: value }

            if (type === 'file') {
                payload[id] = files && files[0] && files[0].name;
                payload.file = files && files[0];
            }

            this.setState((state) => ({
                editedMap: {
                    ...state.editedMap,
                    ...payload,
                },
            }));
        }
    };

    render() {
        const { maps, addingMap, editedMap } = this.state;
        const addMapText = addingMap ? 'Cancel' : 'Add map';

        return <Row className="mt-5 mb-5">
            <Col lg={12} md={12} xs={12}>
                Maps
            </Col>
            <Col lg={12} md={12} xs={12}>
                <Button type="button" className={{ btn: true, 'btn-danger': addingMap }} onClick={() => this.toggleAddingMap()}>{addMapText}</Button>
            </Col>
            {
                addingMap && <Col lg={12} md={12} xs={12}>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Map name</Form.Label>
                            <Form.Control type="name"
                                placeholder="Enter map name"
                                onChange={(e) => this.handleAddFormChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="filename">
                            <Form.Label>Map</Form.Label>
                            <Form.Control type="file"
                                placeholder="Choose file"
                                onChange={(e) => this.handleAddFormChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="coordinates">
                            <Form.Label>Map</Form.Label>
                            <Form.Control type="text"
                                placeholder="Insert map coordinates, e.g. 46.049578_14.4795_46.049594_14.498732_46.040151_14.498755_46.040191_14.47962"
                                onChange={(e) => this.handleAddFormChange(e)} />
                        </Form.Group>

                        <Button onClick={() => this.addMap()}>Add</Button>
                    </Form>

                </Col>
            }
            {
                maps.map((map) => {
                    const editing = editedMap.id && editedMap.id === map.id;
                    const editMapText = editing ? 'Cancel' : 'Edit Map';
                    return (
                        <React.Fragment key={map.id}>
                            <Col lg={12} md={12} xs={12}>
                                {map.name}
                                <img src={`/maps/${map.filename}`} alt={map.filename} style={{ display: 'inline-block', height: '300px', width: 'auto' }} />
                                <Button type="button" className={{ btn: true, 'btn-danger': true }} onClick={() => this.deleteMap(map)}>Delete</Button>
                                <Button type="button" className={{ btn: true, 'btn-danger': editing }} onClick={() => this.toggleEditMap(map)}>{editMapText}</Button>
                            </Col>
                            {
                                editing && <Col lg={12} md={12} xs={12}>
                                    <Form>
                                        <Form.Group controlId="name">
                                            <Form.Label>Map name</Form.Label>
                                            <Form.Control type="name"
                                                placeholder="Enter map name"
                                                value={editedMap.name}
                                                onChange={(e) => this.handleEditFormChange(e)} />
                                        </Form.Group>
                                        <Form.Group controlId="filename">
                                            <Form.Label>Map</Form.Label>
                                            <Form.Control type="file"
                                                placeholder="Choose file"
                                                onChange={(e) => this.handleEditFormChange(e)} />
                                        </Form.Group>
                                        <Form.Group controlId="coordinates">
                                            <Form.Label>Map</Form.Label>
                                            <Form.Control type="text"
                                                placeholder="Insert map coordinates, e.g. 46.049578_14.4795_46.049594_14.498732_46.040151_14.498755_46.040191_14.47962"
                                                value={editedMap.coordinates}
                                                onChange={(e) => this.handleEditFormChange(e)} />
                                        </Form.Group>
                                        <Button onClick={() => this.editMap()}>Edit</Button>
                                    </Form>
                                </Col>
                            }
                        </React.Fragment>
                    )
                })
            }
        </Row>
    }
}

export default Maps;