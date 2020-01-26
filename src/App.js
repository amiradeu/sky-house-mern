import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Houses from "./components/houses/houses.component";
import AddHouse from "./components/houses/add-house.component";
import EditHouse from "./components/houses/edit-house.component";
import Owners from "./components/owners/owners.component";
import About from "./components/about.component";

function App() {
  return (
    <Router>
      <div>
        <div className="container-fluid">
          <Navbar />
          <Route path="/" exact component={Houses} />
          <Route path="/houses/add" exact component={AddHouse} />
          <Route path="/houses/edit/:id" component={EditHouse} />
          <Route path="/owners" exact component={Owners} />
          <Route path="/about" exact component={About} />
        </div>
      </div>
    </Router>
  );
}

export default App;
