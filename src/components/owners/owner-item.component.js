import React from "react";
import { Card } from "react-bootstrap";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

function OwnerItem(props) {
  return (
    <React.Fragment>
      <Card>
        <Card.Img
          variant="top"
          className="rounded-circle p-1 mx-auto d-block"
          src={props.owner.imgsrc}
          alt="owner"
        ></Card.Img>
        <Card.Body className="mb-4">
          <Card.Title className="text-center text-capitalize">
            {props.owner.ownername}
          </Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            ad distinctio dicta, quas neque, nisi beatae quisquam eveniet
            laboriosam unde aliquam
          </Card.Text>
        </Card.Body>
        <div className="tools">
          <div
            className="rounded-circle edit "
            onClick={() => {
              window.location = "/owners/edit/" + props.owner._id;
            }}
          >
            <FiEdit2 size={26}></FiEdit2>
          </div>
          <div
            className="rounded-circle trash"
            onClick={() => {
              props.deleteOwner(props.owner._id);
            }}
          >
            <FiTrash2 size={26}></FiTrash2>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
}

export default OwnerItem;
