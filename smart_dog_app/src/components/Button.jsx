import React from "react";
import "../index.css";

const Button = function(props) {
    return(
        <button
            className = {props.type}    // Bootstrap 4 has built-in button styles.
            onClick={props.action}>
            {props.title}
        </button>
    );
};

export default Button;