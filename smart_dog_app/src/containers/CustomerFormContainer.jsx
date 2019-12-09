import React from "react";
import Input from "../components/Input";
// import PropTypes from "prop-types"; // Prop-types can be used to require certain fields to be filled out.

const CustomerFormContainer = props => {
  return (
    <div className="col-md-6">
      <Input
        type={"text"}
        title={"First Name"}
        name={"first"}
        value={props.values.first}
        placeholder={""}
        // Pass the parent handleInputChange method
        // to update parent state anytime fields
        // are changed.
        handlechange={props.handleInputChange}
      />
      <Input
        type={"text"}
        title={"Last Name"}
        name={"last"}
        value={props.values.last}
        placeholder={""}
        handlechange={props.handleInputChange}
      />
      <Input
        required={true}
        type={"text"}
        title={"Address"}
        name={"address"}
        value={props.values.address}
        placeholder={""}
        handlechange={props.handleInputChange}
      />
      <Input
        type={"text"}
        title={"City"}
        name={"city"}
        value={props.values.city}
        placeholder={""}
        handlechange={props.handleInputChange}
      />
      <Input
        type={"text"}
        title={"State"}
        name={"state"}
        value={props.values.state}
        placeholder={""}
        handlechange={props.handleInputChange}
      />
      <Input
        required={true}
        type={"text"}
        title={"Zip Code"}
        name={"zipCode"}
        value={props.values.zipCode}
        placeholder={""}
        handlechange={props.handleInputChange}
      />
      <Input
        required={true}
        type={"text"}
        title={"Phone Number (Including Country Code, no spaces or dashes)"}
        name={"phone"}
        value={props.values.phone}
        placeholder={""}
        handlechange={props.handleInputChange}
      />
    </div>
  );
};

export default CustomerFormContainer;
