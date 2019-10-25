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
            {props.title}
        </button>
    );
>>>>>>> 5b7bd0991b7405d16ccc6931bb3d34288932ad40
};

export default Button;
