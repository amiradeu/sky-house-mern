import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class CreateOwner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ownername: ""
    };

    this.handleChangeOwnername = this.handleChangeOwnername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeOwnername(e) {
    this.setState({
      ownername: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const owner = {
      ownername: this.state.ownername
    };

    console.log(owner);

    axios
      .post("http://localhost:5000/owners/add", owner)
      .then(res => console.log(res.data));

    window.location = "/owners/";
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Create New Owner</h1>
        <Form.Group>
          <Form.Label>Owner</Form.Label>
          <Form.Control
            required
            type="text"
            name="ownername"
            value={this.state.ownername}
            onChange={this.handleChangeOwnername}
            placeholder="Enter owner name"
          />
        </Form.Group>
        <Button variant="primary">Create Owner</Button>
      </Form>
    );
  }
}

export default CreateOwner;
