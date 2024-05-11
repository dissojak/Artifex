import React from "react";
import "./RadioCheckbox.css";

const RadioCheckbox = (props) => {
  return (
    <div>
      <input
        style={{ display: " none" }}
        id={props.userType}
        name="userType"
        value={props.userType}
        checked={props.isChecked}
        type="checkbox"
        onChange={props.changeType}
      />
      <label className="check">
        <svg viewBox="0 0 18 18" height="18px" width="18px">
          <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
      <span className="textSpan">{props.userType}</span>
    </div>
  );
};

export default RadioCheckbox;
