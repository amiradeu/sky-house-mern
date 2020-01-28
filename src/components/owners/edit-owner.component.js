import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

class EditOwner extends Component {
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

  componentDidMount() {
    axios
      .get("http://localhost:5000/owners/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          ownername: res.data.ownername
        });
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    const owner = {
      ownername: this.state.ownername
    };

    console.log(owner);

    axios
      .post(
        "http://localhost:5000/owners/edit/" + this.props.match.params.id,
        owner
      )
      .then(res => console.log(res.data));

    window.location = "/owners/";
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Edit Owner</h1>
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
        <Button variant="primary">Save Changes</Button>
      </Form>
    );
  }
}

export default EditOwner;
