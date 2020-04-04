import React from "react";

function HideInput(props) {
  return (
    <input
      required
      tabIndex={-1}
      autoComplete="off"
      style={{
        opacity: 0,
        height: 0,
        position: "absolute",
        marginTop: "-20px"
      }}
      defaultValue={props.dataInput}
    />
  );
}

export default HideInput;
