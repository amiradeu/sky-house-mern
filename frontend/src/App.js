import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/navbar/navbar.component";
import Houses from "./components/houses/houses.component";
import AddHouse from "./components/houses/add-house.component";
import EditHouse from "./components/houses/edit-house.component";
import Signup from "./components/login_signup/signup.component";
import Login from "./components/login_signup/login.component";
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
        <Route exact path="/" component={Signup}>
          <Redirect to="/signup" />
        </Route>
        <Container fluid>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/houses/" component={Houses} />
          <Route exact path="/houses/add" component={AddHouse} />
          <Route path="/houses/edit/:id" component={EditHouse} />
          <Route exact path="/owners" component={Owners} />
          <Route exact path="/owners/add" component={AddOwner} />
          <Route path="/owners/edit/:id" component={EditOwner} />
          <Route exact path="/about" component={About} />
        </Container>
      </React.Fragment>
    </Router>
  );
}

export default App;
