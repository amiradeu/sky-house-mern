import React, { Component } from "react";
import axios from "axios";

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
      <div>
        <h1>Create New Owner</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Owner</label>
            <input
              required
              type="text"
              name="ownername"
              value={this.state.ownername}
              onChange={this.handleChangeOwnername}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Create Owner</button>
        </form>
      </div>
    );
  }
}

export default CreateOwner;
