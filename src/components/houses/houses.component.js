import React, { Component } from "react";
import House from "./house-item.component";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

class Houses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
    };
    this.deleteHouse = this.deleteHouse.bind(this);
  }

  deleteHouse(id) {
    axios
      .delete("http://localhost:5000/houses/" + id)
      .then(res => console.log(res.data));
    this.setState({
      houses: this.state.houses.filter(elem => elem._id !== id)
    });
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/houses")
      .then(res => {
        this.setState({
          houses: res.data
        });
      })
      .catch(err => console.log(`Error: ${err}`));
  }

  render() {
    let houseList = this.state.houses.map(house => {
      return (
        <Col key={house._id} lg={4} md={6} className="mb-5">
          <House house={house} deleteHouse={this.deleteHouse} />
        </Col>
      );
    });

    return (
      <Container>
        <Row>
          <h1>Houses</h1>
          <Button href="/houses/add/" className="m-2" variant="warning">
            ADD new house
          </Button>
        </Row>
        <Row>{houseList}</Row>
      </Container>
    );
  }
}

export default Houses;
