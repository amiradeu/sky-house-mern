import React from "react";
import ownerImg from "../../house_svg/fan.svg";
import { Link } from "react-router-dom";

function OwnerItem(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={ownerImg}
        alt="house"
        width="280"
        height="180"
      ></img>
      <div className="card-body">
        <h5 className="card-title">{props.owner.ownername}</h5>
        <p className="card-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          ad distinctio dicta, quas neque, nisi beatae quisquam eveniet
          laboriosam unde aliquam at illo sed! Incidunt debitis odit ea
          consequuntur officia?
        </p>
        <Link
          to={"/owners/edit/" + props.owner._id}
          className="btn btn-primary"
        >
          Edit
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => {
            props.deleteOwner(props.owner._id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default OwnerItem;
