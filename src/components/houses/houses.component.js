import React, { Component } from "react";
import CreateHouse from "./create-house.component";

class Houses extends Component {
  state = {};
  render() {
    return (
      <div>
        This is the House tab <CreateHouse></CreateHouse>
      </div>
    );
  }
}

export default Houses;
