import React, { Component } from "react";
import Common from "./common.component";

class Signup extends Component {
  render() {
    return (
      <Common
        cardText="sign up"
        cardFooter="Already have an account?"
        cardToggle="login"
        cardBanner="Join Sky House Today!"
      ></Common>
    );
  }
}

export default Signup;
