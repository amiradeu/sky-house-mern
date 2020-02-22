import React, { useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import marker from "../../assets/images/marker.png";
import markerHover from "../../assets/images/marker-hover.png";
import "./marker.css";

const M_SIZE = 40;

const markerStyle = {
  position: "absolute",
  width: M_SIZE,
  height: M_SIZE,
  left: -M_SIZE / 2, //center coord
  top: -M_SIZE, // bottom coord
  cursor: "pointer",
  backgroundImage: `url("${marker}")`,
  backgroundSize: "cover"
};

const markerStyleHover = {
  position: "absolute",
  width: M_SIZE,
  height: M_SIZE,
  left: -M_SIZE / 2, //center coord
  top: -M_SIZE, // bottom coord
  cursor: "pointer",
  backgroundImage: `url("${markerHover}")`,
  backgroundSize: "cover"
};

const MapMarker = props => {
  const markerState = props.$hover ? markerStyleHover : markerStyle;
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <Toast
        style={{ position: "absolute", width: "300px" }}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img
            src={props.house.houseImg}
            style={{ width: "20px", height: "20px" }}
            className="rounded-circle mr-2"
          ></img>
          <strong className="mr-auto">{props.house.houseName}</strong>
          <small>${props.house.price}</small>
        </Toast.Header>
        <Toast.Body>{props.house.description}</Toast.Body>
      </Toast>
      <div style={markerState} onClick={() => setShow(true)}></div>
      <div className="pulse" onClick={() => setShow(true)}></div>
    </React.Fragment>
  );
};

export default MapMarker;
