import React from "react";
import ownerImg from "../../house_svg/fan.svg";
import { Card, Button } from "react-bootstrap";

function OwnerItem(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        className="card-img-top"
        src={ownerImg}
        alt="house"
        width="280"
        height="180"
      ></Card.Img>
      <Card.Body>
        <Card.Title className="text-center text-capitalize">
          {props.owner.ownername}
        </Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          ad distinctio dicta, quas neque, nisi beatae quisquam eveniet
          laboriosam unde aliquam at illo sed! Incidunt debitis odit ea
          consequuntur officia?
        </Card.Text>
        <a className="m-3" href={"/owners/edit/" + props.owner._id}>
          Edit
        </a>
        <Button
          variant="danger"
          onClick={() => {
            props.deleteOwner(props.owner._id);
          }}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OwnerItem;
