import React, { Component } from "react";
import axios from "axios";
import Owner from "./owner-item.component";
import { Link } from "react-router-dom";
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
      <Owner key={owner._id} owner={owner} deleteOwner={this.deleteOwner} />
    ));

    return (
      <div>
        <h1>Owner</h1>
        <Link to="/owners/add" className="btn btn-dark">
          Add Owner
        </Link>
        {ownerList}
      </div>
    );
  }
}

export default Owners;
