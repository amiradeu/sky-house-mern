import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./navbar.css";

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Navbar.Brand href="/">Sky House</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav>
            <Nav.Link href="/">Map</Nav.Link>
            <Nav.Link href="/houses">Houses</Nav.Link>
            <Nav.Link href="/owners">Owners</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
