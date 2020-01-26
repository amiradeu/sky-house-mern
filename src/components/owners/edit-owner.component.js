import React, { Component } from "react";
import axios from "axios";

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
          <button className="btn btn-primary">Save changes</button>
        </form>
      </div>
    );
  }
}

export default EditOwner;
