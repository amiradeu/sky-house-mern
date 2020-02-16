import React from "react";
import { Card } from "react-bootstrap";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import baththub from "../../assets/images/bathtub.svg";
import bed from "../../assets/images/bed.svg";

function House(props) {
  let cardText = props.house.description;

  if (cardText.length > 100)
    cardText = <React.Fragment>{cardText.slice(0, 100)}...</React.Fragment>;
  else if (cardText.length < 10)
    cardText = <React.Fragment>{cardText}</React.Fragment>;

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <div className="locationCard">
            {props.house.city}, {props.house.country}
          </div>
          <IoIosArrowDown className="expandCard" size={26}></IoIosArrowDown>
        </Card.Header>
        <Card.Img
          variant="top"
          src={props.house.houseImg}
          alt="house"
          className="rounded-circle mx-auto d-block"
        />
        <Card.Img
          variant="bottom"
          src={props.house.houseImg}
          alt="owner"
          className="rounded-circle mx-auto d-block"
        />
        <Card.Body>
          <Card.Title className="text-center text-uppercase">
            {props.house.houseName}
          </Card.Title>
          <Card.Subtitle className="text-center">
            <span className="price">${props.house.price}</span>/ night
          </Card.Subtitle>
          <Card.Text className="mt-2">{cardText}</Card.Text>
        </Card.Body>
        <Card.Footer className="mx-auto d-block">
          <h3>
            3
            <img
              src={bed}
              alt="bed"
              height="30px"
              width="30px"
              className="mx-2"
            ></img>
            2
            <img
              src={baththub}
              alt="bath"
              height="30px"
              width="30px"
              className="mx-2 mt-n2"
            ></img>
          </h3>
        </Card.Footer>
        <div className="tools">
          <div
            className="rounded-circle edit "
            onClick={() => {
              window.location = "/houses/edit/" + props.house._id;
            }}
          >
            <FiEdit2 size={26}></FiEdit2>
          </div>
          <div
            className="rounded-circle trash"
            onClick={() => {
              props.deleteHouse(props.house._id);
            }}
          >
            <FiTrash2 size={26}></FiTrash2>
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
}

export default House;
