import React from "react";
import { Card, Button } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { FaUserAlt, FaCalendarDay, FaRegEdit } from "react-icons/fa";

function House(props) {
  let cardText = props.house.description;

  if (cardText.length > 50) cardText = cardText.slice(0, 50) + "...(read more)";
  else if (cardText.length < 10)
    cardText = (
      <React.Fragment>
        {cardText}
        <br></br>
        <br></br>
      </React.Fragment>
    );

  return (
    <Card className="m-3">
      <Card.Header as="h5" className="rounded-0">
        <MdLocationOn className="mr-1" size={16}></MdLocationOn>
        {props.house.location}
      </Card.Header>
      <Card.Img
        variant="top"
        src={props.house.imgsrc}
        alt="house"
        className="rounded-circle m-2 mx-auto d-block"
      />
      <Card.Body className="rounded-0">
        <Card.Title className="text-center text-uppercase">
          {props.house.housename}
        </Card.Title>
        <Card.Subtitle className="text-center">
          <FaUserAlt className="m-1"></FaUserAlt>
          {props.house.ownername}
          <FaCalendarDay className="m-1"></FaCalendarDay>
          {props.house.datePurchased.substring(0, 10)}
        </Card.Subtitle>
        <Card.Text>{cardText}</Card.Text>
      </Card.Body>
      <Card.Footer className="rounded-0">
        <div className="float-right">
          <a
            className="mx-3 editHouse"
            href={"/houses/edit/" + props.house._id}
          >
            <FaRegEdit className="mr-1"></FaRegEdit>
            Edit
          </a>
          <Button
            variant="dark"
            onClick={() => {
              props.deleteHouse(props.house._id);
            }}
          >
            Delete
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default House;
