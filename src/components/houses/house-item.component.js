import React from "react";
import houseImg from "../../house_svg/house-building-1.svg";
import { Card, Button } from "react-bootstrap";

function House(props) {
  return (
    <Card className="h-100" style={{ width: "18rem" }} bg="light">
      <Card.Header as="h5">{props.house.ownername}</Card.Header>
      <Card.Img
        variant="top"
        src={houseImg}
        alt="house"
        width="280"
        height="180"
      />
      <Card.Body>
        <Card.Title className="text-center text-uppercase">
          {props.house.housename}
        </Card.Title>
        <Card.Subtitle className="text-center">
          {props.house.location} || {props.house.datePurchased.substring(0, 10)}
        </Card.Subtitle>
        <Card.Text>{props.house.description}</Card.Text>
        <a className="m-3" href={"/houses/edit/" + props.house._id}>
          Edit
        </a>
        <Button
          variant="danger"
          onClick={() => {
            props.deleteHouse(props.house._id);
          }}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default House;
