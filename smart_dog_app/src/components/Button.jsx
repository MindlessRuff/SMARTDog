import React from "react";
import "../index.css";

const Button = function(props) {
<<<<<<< HEAD
  return (
    <button
      className={props.type} // Bootstrap 4 has built-in button styles.
      onClick={props.action}
    >
      {props.title}
    </button>
  );
=======
    return(
        <button
            className = {props.type}    // Bootstrap 4 has built-in button styles.
            onClick={props.action}>
            {props.title}              {/* title = Text of the button */}
        </button>
    );
>>>>>>> b39242b3f668f0a01bc7323638c0afe17f29aaec
};

export default Button;
