import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../house_svg/home-building-like-a-birds-house.svg";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img
            className="d-inline-block align-middle m-2 mr-4"
            src={logo}
            alt="house"
            width="50"
            height="50"
          />
          Sky House
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/houses/">
                Houses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/owners">
                Owners
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
