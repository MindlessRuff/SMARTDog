import React, { Component } from "react";
import Input from "../components/Input";
import PropTypes from "prop-types"; // Prop-types can be used to require certain fields to be filled out.

const DogFormContainer = props => {
    // Grab the user values passed in from
    // the parent container (SignupForm)
    // That way value will update when the state
    // of the parent is updated, like with clear
    // and any future functions.
    return (
      <div className="col-md-6">
        <Input
          type={"text"}
          title={"Dog's Name"}
          name={"dogName"}
          value={props.values.dogName}
          placeholder={""}
          // Pass the parent handleInputChange method
          // to update parent state anytime fields
          // are changed.
          handlechange={props.handleDogInput}
        />
        <Input
          type={"text"}
          title={"Dog's Breed"}
          name={"dogBreed"}
          value={props.values.dogBreed}
          placeholder={""}
          handlechange={props.handleDogInput}
        />
        <Input
          type={"text"}
          title={"Dog ID/EUI Number"}
          name={"eui"}
          value={props.values.eui}
          placeholder={""}
          handlechange={props.handleDogInput}
        />
      </div>
    );
  }

export default DogFormContainer;
