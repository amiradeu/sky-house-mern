import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./register.css";

class RegisterOwner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHeader: "Sign Up",
      cardBtn: "sign up",
      cardFooter: "Already have an account?",
      cardToggle: "LOGIN",
      cardBanner: "Join Sky House Today!",
      cardBoolean: 0
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    if (this.state.cardBoolean) {
      this.setState({
        cardHeader: "Sign Up",
        cardBtn: "sign up",
        cardFooter: "Already have an account?",
        cardToggle: "LOGIN",
        cardBanner: "Join Sky House Today!",
        cardBoolean: 0
      });
    } else {
      this.setState({
        cardHeader: "Log In",
        cardBtn: "log in",
        cardFooter: "Don't have an account?",
        cardToggle: "SIGNUP",
        cardBanner: "Welcome Back!",
        cardBoolean: 1
      });
    }
  }

  render() {
    const cardClass = [
      "cardContainer",
      this.state.cardBoolean && "cardContainer--open"
    ].filter(Boolean);

    return (
      <Container id="loginCard" className={cardClass.join(" ")}>
        <Row>
          <Col sm={5} id="loginInfo">
            <h1>{this.state.cardHeader}</h1>
            <Form.Label>Email</Form.Label>
            <Form.Group>
              <Form.Control
                required
                type="email"
                name="email"
                className="loginInput"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Group>
              <Form.Control
                required
                type="text"
                name="password"
                className="loginInput"
                autoComplete="off"
              />
            </Form.Group>
            <button className="btn btn-dark loginBtn">
              {this.state.cardBtn}
            </button>
            <div id="loginFooter">
              <small>{this.state.cardFooter}</small>
              <small id="toggleFooter" onClick={this.handleToggle}>
                {this.state.cardToggle}
              </small>
            </div>
          </Col>
          <Col sm={7} id="loginBannerOverlay">
            <div id="loginBanner"></div>
            <h1 id="loginBannerText">{this.state.cardBanner}</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegisterOwner;
