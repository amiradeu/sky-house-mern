import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "./components/navbar/navbar.component";
import Houses from "./components/houses/houses.component";
import AddHouse from "./components/houses/add-house.component";
import EditHouse from "./components/houses/edit-house.component";
import RegisterOwner from "./components/owners/register-owner.component";
import Owners from "./components/owners/owners.component";
import AddOwner from "./components/owners/add-owner.component";
import EditOwner from "./components/owners/edit-owner.component";
import About from "./components/about/about.component";
import Map from "./components/map/map.component";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Navbar />
        <Route path="/" exact component={Map} />
        <Container fluid>
          <Route path="/houses/" exact component={Houses} />
          <Route path="/houses/add" exact component={AddHouse} />
          <Route path="/houses/edit/:id" component={EditHouse} />
          <Route path="/owners" exact component={Owners} />
          <Route path="/owners/add" exact component={AddOwner} />
          <Route path="/owners/edit/:id" component={EditOwner} />
          <Route path="/about" exact component={About} />
          <Route path="/register" exact component={RegisterOwner} />
        </Container>
      </React.Fragment>
    </Router>
  );
}

export default App;
