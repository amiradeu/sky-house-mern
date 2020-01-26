import React from "react";
import houseImg from "../../house_svg/house-building-1.svg";
import { Link } from "react-router-dom";

function House(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={houseImg}
        alt="house"
        width="280"
        height="180"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.house.housename}</h5>
        <p className="card-text">{props.house.description}</p>
        <ul>
          <li>{props.house.ownername}</li>
          <li>{props.house.location}</li>
          <li>{props.house.datePurchased.substring(0, 10)}</li>
        </ul>
        <Link
          to={"/houses/edit/" + props.house._id}
          className="btn btn-primary"
        >
          Edit
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.deleteHouse(props.house._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default House;
