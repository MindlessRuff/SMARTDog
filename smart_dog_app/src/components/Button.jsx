import React from "react";

const Button = function(props) {
    return(
        <button
            className = {
                props.type === 'primary' ? 'btn btn-primary' : 'btn btn-secondary'
            }
            onClick={props.action}>
            {props.title}
        </button>
    );
};

export default Button;