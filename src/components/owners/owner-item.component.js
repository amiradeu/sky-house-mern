import React from "react";
import ownerImg from "../../imgs/user.jpg";
import { Card, Button } from "react-bootstrap";
import { MdLocationOn } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function OwnerItem(props) {
  return (
    <Card className="m-3">
      <Card.Header as="h5" className="rounded-0">
        <MdLocationOn className="mr-1" size={16}></MdLocationOn>
        location
      </Card.Header>
      <Card.Img
        variant="top"
        className="rounded-circle p-1 mx-auto d-block"
        src={ownerImg}
        alt="owner"
      ></Card.Img>
      <Card.Body>
        <Card.Title className="text-center text-capitalize">
          {props.owner.ownername}
        </Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          ad distinctio dicta, quas neque, nisi beatae quisquam eveniet
          laboriosam unde aliquam
        </Card.Text>
      </Card.Body>
      <Card.Footer className="rounded-0">
        <div className="float-right">
          <a
            className="mx-3 editHouse"
            href={"/owners/edit/" + props.owner._id}
          >
            <FaRegEdit className="mr-1"></FaRegEdit>
            Edit
          </a>
          <Button
            variant="dark"
            onClick={() => {
              props.deleteOwner(props.owner._id);
            }}
          >
            Delete
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default OwnerItem;
