import React from "react";
import { Card } from "react-bootstrap";
import user from "../../assets/images/user.png";
import house from "../../assets/images/house.png";

const NewHouse = () => {
  return (
    <React.Fragment>
      <Card
        onClick={() => {
          window.location = "/houses/add/";
        }}
      >
        <div id="addnew">Add house</div>
        <Card.Img
          variant="top"
          src={house}
          alt="house"
          className="rounded-circle mx-auto d-block"
        />
        <Card.Img
          variant="bottom"
          src={user}
          alt="owner"
          className="rounded-circle mx-auto d-block"
        />
      </Card>
    </React.Fragment>
  );
};

export default NewHouse;
