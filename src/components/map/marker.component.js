import React from "react";

const MapMarker = ({ house, style }) => {
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
      <div style={style}></div>
    </React.Fragment>
  );
};

export default MapMarker;
