import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./register.css";

class RegisterOwner extends Component {
  state = {};
  render() {
    return (
      <Container id="loginCard" className="">
        <Row>
          <Col sm={5} id="loginInfo">
            <h1>Sign Up</h1>
            <Form.Label>Email</Form.Label>
            <Form.Group>
              <Form.Control
                required
                type="email"
                name="email"
                className="formInput"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Group>
              <Form.Control
                required
                type="text"
                name="password"
                className="formInput"
                autoComplete="off"
              />
            </Form.Group>
            <button className="btn btn-dark ">Signup</button>
            <Container>
              <small>Already have an account?</small>
              <a href="#">LOGIN</a>
            </Container>
          </Col>
          <Col sm={7} id="loginBanner">
            <h1>Join Sky House today!</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RegisterOwner;
