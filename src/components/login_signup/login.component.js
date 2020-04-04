import React, { Component } from "react";
import Common from "./common.component";

class Login extends Component {
  render() {
    return (
      <Common
        cardText="log in"
        cardFooter="Don't have an account?"
        cardToggle="signup"
        cardBanner="Welcome Back!"
      ></Common>
    );
  }
}

export default Login;
