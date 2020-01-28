import React, { Component } from "react";
import axios from "axios";
import Owner from "./owner-item.component";
import { Container, Row, Col, Button } from "react-bootstrap";

class Owners extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: []
    };
    this.deleteOwner = this.deleteOwner.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:5000/owners").then(res => {
      this.setState({
        owners: res.data
      });
    });
  }

  deleteOwner(id) {
    axios.delete("http://localhost:5000/owners/" + id).then(res => {
      console.log(res.data);
    });
    this.setState({
      owners: this.state.owners.filter(elem => elem._id !== id)
    });
  }

  render() {
    let ownerList = this.state.owners.map(owner => (
      <Col key={owner._id} lg={4} md={6} className="mb-5">
        <Owner owner={owner} deleteOwner={this.deleteOwner} />
      </Col>
    ));

    return (
      <Container>
        <Row>
          <h1>Owners</h1>
          <Button href="/owners/add/" className="m-2" variant="warning">
            ADD new owner
          </Button>
        </Row>
        <Row>{ownerList}</Row>
      </Container>
    );
  }
}

export default Owners;
