import React, { PropTypes, Component } from "react";
import marker from "../../assets/images/marker.png";
import markerHover from "../../assets/images/marker-hover.png";

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

const markerHeaderStyle = {
  position: "absolute",
  width: M_SIZE * 2,
  height: M_SIZE * 1.4,
  left: -M_SIZE,
  bottom: M_SIZE * 2,
  cursor: "pointer"
};

class MapMarker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const markerState = this.props.$hover ? markerStyleHover : markerStyle;
    return (
      <React.Fragment>
        {/* <div style={markerHeaderStyle}>
          <p>{house.houseName}</p>
          <img
            src={house.houseImg}
            style={{ width: "50px", height: "50px" }}
            className="rounded-circle mx-auto d-block"
          ></img>
        </div> */}
        <div style={markerState}></div>
      </React.Fragment>
    );
  }
}

export default MapMarker;
