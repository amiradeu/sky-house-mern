import React, { Component } from "react";
import axios from "axios";

import Owner from "./owner-item.component";

import { Button, CardDeck } from "react-bootstrap";
import { MdAddCircle } from "react-icons/md";

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
      <React.Fragment>
        <Button href="/owners/add/" className="mt-3" variant="dark">
          <MdAddCircle className="mr-1"></MdAddCircle>new owner
        </Button>
        <CardDeck>{ownerList}</CardDeck>
      </React.Fragment>
    );
  }
}

export default Owners;
