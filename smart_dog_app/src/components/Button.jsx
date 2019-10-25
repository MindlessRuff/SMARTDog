import React from "react";
import "../index.css";

const Button = function(props) {
<<<<<<< HEAD
  return (
    <button
      className={props.type} // Bootstrap 4 has built-in button styles.
      onClick={props.action}
    >
      {props.title} {/* title = Text of the button */}
    </button>
  );
=======
    return (
        <button
            className={props.type}    // Bootstrap 4 has built-in button styles.
            onClick={props.action}>
            {props.title}              {/* title = Text of the button */}
        </button>
    );
>>>>>>> eeefd11e6329b1fb38ea7fabdbb651b70c6c9356
};

export default Button;
