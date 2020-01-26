import React, { Component } from "react";
import CreateOwner from "./create-owner.component";

class Owners extends Component {
  state = {};
  render() {
    return (
      <div>
        This is the owner page
        <CreateOwner />
      </div>
    );
  }
}

export default Owners;
