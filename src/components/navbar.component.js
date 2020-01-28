import React, { Component } from "react";
import logo from "../house_svg/home-building-like-a-birds-house.svg";
import { Navbar, Nav, Image } from "react-bootstrap";

class Navigation extends Component {
  render() {
    return (
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="/">
          <Image
            className="d-inline-block align-middle m-2 mr-4"
            src={logo}
            alt="house"
            width="50"
            height="50"
          />
          Sky House
        </Navbar.Brand>
        <Navbar.Collapse id="navbarNav">
          <Nav>
            <Nav.Link href="/houses">Houses</Nav.Link>
            <Nav.Link href="/owners">Owners</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="navbarNav" />
      </Navbar>
    );
  }
}

export default Navigation;
