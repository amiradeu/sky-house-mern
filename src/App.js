import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Houses from "./components/houses/houses.component";
import Owners from "./components/owners/owners.component";
import About from "./components/about.component";

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Houses} />
      <Route path="/owners" exact component={Owners} />
      <Route path="/about" exact component={About} />
    </Router>
  );
}

export default App;
