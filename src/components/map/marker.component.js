import React, { useState } from "react";
import { Toast, Button } from "react-bootstrap";
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
  const [showInfo, setShowInfo] = useState(0);
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <div
        style={markerState}
        onClick={() => {
          setShowInfo(1);
          setShow(true);
          console.log("click to show toast");
          console.log(`Val: ${showInfo}`);
        }}
      />
      <div className="pulse" onClick={() => setShowInfo(1)}></div>
      <div
        className="showInfo"
        style={{
          position: "absolute",
          width: "300px",
          display: "block",
          opacity: showInfo,
          fontSize: ".875rem",
          backgroundColor: "rgba(255,255,255,.85)",
          backgroundClip: "padding-box",
          border: "1px solid rgba(0,0,0,.1)",
          boxShadow: "0 0.25rem 0.75rem rgba(0,0,0,.1)",
          borderRadius: ".25rem",
          backdropFilter: "blur(10px)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: ".25rem .75rem",
            color: "#6c757d",
            borderBottom: "1px solid rgba(0,0,0,.05)"
          }}
        >
          <img
            src={props.house.houseImg}
            style={{ width: "20px", height: "20px" }}
            className="rounded-circle mr-2"
          ></img>
          <strong className="mr-auto">{props.house.houseName}</strong>
          <small>${props.house.price}</small>
          <span
            onClick={() => {
              setShowInfo(0);
              console.log("toast close");
            }}
            style={{
              cursor: "pointer",
              boxSizing: "border-box",
              fontSize: "1.5rem",
              fontWeight: "700",
              lineHeight: "1",
              textShadow: "0 1px 0 #fff"
            }}
          >
            x
          </span>
        </div>
        <div style={{ padding: ".75rem" }}>{props.house.description}</div>
      </div>
      <Toast
        style={{ position: "absolute", width: "300px" }}
        onClose={() => setShow(false)}
        show={show}
        // delay={3000}
        // autohide
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
    </React.Fragment>
  );
};

export default MapMarker;
