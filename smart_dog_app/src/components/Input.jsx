import React from "react";

const Input = function(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label" style={{color: 'whitesmoke', fontStyle: '1.5rem', textShadow: '0.1rem 0.1rem 0.1rem black'}}>
        {<strong>{props.title}</strong>}
      </label>
      <input
        className="form-control"
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handlechange}
        placeholder={props.placeholder}
        required={props.required}
      />
    </div>
  );
};

export default Input;
