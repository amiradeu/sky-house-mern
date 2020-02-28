import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./common.css";

function Common({ cardText, cardFooter, cardToggle, cardBanner }) {
  return (
    <Container id="loginCard">
      <Row>
        <Col sm={5} id="loginInfo">
          <h1>{cardText}</h1>
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
          <button className="btn btn-dark loginBtn">{cardText}</button>
          <div id="loginFooter">
            <small>{cardFooter}</small>
            <a href={`/${cardToggle}`} id="toggleFooter">
              {cardToggle}
            </a>
          </div>
        </Col>
        <Col sm={7} id="loginBannerOverlay">
          <div id="loginBanner"></div>
          <h1 id="loginBannerText">{cardBanner}</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Common;
