import React from "react";

// forwardRef allows DOM reference from parent to be used in a functional-only child.
const Select = React.forwardRef((props, ref) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className='form-label'> {props.title} </label>
      <select
        ref={ref}
				className='form-control'
        name={props.name}
        value={props.value}
				onChange={props.handleChange}
        style={props.style}
        size={props.size}
        onBlur={props.handleBlur}
      >
        <option value="">
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
});

export default Select;
