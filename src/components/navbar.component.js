import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../house_svg/home-building-like-a-birds-house.svg";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light center">
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
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link className="nav-link" to="/">
                Houses
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/owners">
                Owners
              </Link>
            </li>
            <li class="nav-item">
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
