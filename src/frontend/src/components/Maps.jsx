import React, { Component } from 'react';

import { getBackend } from '../lib/Backend';

import {
  Row,
  Col,
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
    }
    this.backend = getBackend().admin
  }



  componentDidMount() {
    this.updateMaps()
  }

  updateMaps = async () => {
    let maps = await this.backend.getMaps()
    this.setState({ maps })
  }

  render() {
    const { maps } = this.state;
    return <Row className="mt-5 mb-5">
      <Col lg={12} md={12} xs={12}>
        Maps
      </Col>
      {
        maps.map((map) => <Col key={map.id} lg={12} md={12} xs={12}>
          {map.name}
          <img src={`/maps/${map.filename}`} alt={map.filename} style={{ display: 'inline-block', height: '300px', width: 'auto' }} />
        </Col>)
      }

    </Row>
  }

}

export default Maps;