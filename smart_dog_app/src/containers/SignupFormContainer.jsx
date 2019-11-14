import React, { Component } from "react";
import Button from "../components/Button";
import CustomerFormContainer from "./CustomerFormContainer";
import axios from "axios";
import DogFormContainer from "./DogFormContainer";

// This Signup form container is the top-level component
// of the signup page. It holds all the state (variables)
// and passes the variables down to its children components,
// the individual (dog, user) containers, and from there to the textboxes
// to keep those boxes populated with this top-level state.
class SignupFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        first: "",
        last: "",
        address: "",
        city: "",
        state: "",
        zipCode: ""
      },
      dogName: "",
      dogInfo:{
        Breed: "",
        EUI: "",
      },
      message: ""
    };
    let id;
  }

  componentDidMount() {
    let email = this.props.email;
    // Need to use arrow functions with axios calls so that 'this' variable will
    // refer to the class component instead of axios.
    axios
      .get(`/users?email=${email}`)
      .then(response => {
        let fetchedData = response.data[0].userInfo;
        this.setState({ userInfo: fetchedData, message: "" }); // [0] index since entries keyed by email are unique
        this.id = response.data[0].id;
        console.log('incomponentdidmount', this.state);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Input change event is passed to all children in render
  // components so it triggers the parent (this form)
  // to update its state
  handleInputChange = event => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [event.target.name]: event.target.value
      },
      message: ""
    });
  };

  handleDogInput = event => {
    this.setState({
      dogInfo:{
        ...this.state.dogInfo,
        [event.targe.name]: event.target.value
      },
      dogName:{
        ...this.state.dogName,
        [event.target.name]: event.target.value
      }
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let email = this.props.email;
    let userInfo = this.state.userInfo;
    let dogName = this.state.dogName;
    let dogInfo = this.state.dogInfo;
    this.setState({ message: "Processing..." });
    // Insert the id of the current user into the put request, can't do it with email key.
    console.log(email, userInfo, this.id);
    axios
      .put(`/users/${this.id}`, {
        email: email,
        userInfo: userInfo,
        dog:[{
          dogName: dogName,
          dogInfo: dogInfo
        }]
      })
      .catch(error => {
        console.log(error);
      });
    //tells the user to finish updating their address
    if (
      this.state.userInfo.address === "" ||
      this.state.userInfo.state === "" ||
      this.state.userInfo.city === "" ||
      this.state.userInfo.zipCode === ""
    )
      this.setState({ message: "PLEASE UPDATE ADDRESS :(" });
    else this.setState({ message: "Profile Updated" });
  };

  handleFormClear = event => {
    event.preventDefault();
    this.setState({
      first: "",
      last: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      message: ""
    });
  };

  render() {
    // Destructure state into variables to pass into child components.
    // This will keep the child component textboxes populated with
    // the parent's variables. It also will change child component
    // state anytime a parent function is called, like clear or submit.
    const { first, last, address, city, state, zipCode } = this.state.userInfo;
    const { dogBreed, eui } = this.state.dogInfo;
    const dogName = this.state.dogName;
    const userValues = { first, last, address, city, state, zipCode };
    const petValues = { dogName, dogBreed, eui };

    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <div className="container">
          <div className="row">
          <CustomerFormContainer
            handleInputChange={this.handleInputChange}
            values={userValues}
          />
          <DogFormContainer
            handleFormClear={this.handleDogInput}
            values={petValues}
          />
          </div>
        </div>
        <div className="container">
          <div className="row">
          <Button
            action={this.handleFormSubmit}
            type={"btn btn-primary"}
            title={"Update"}
          />
          <Button
            action={this.handleFormClear}
            type={"btn btn-primary"}
            title={"Add Dog"}
            />
        </div>
        </div>
        <div className="result">{this.state.message}</div>
      </form>
    );
  }
}

export default SignupFormContainer;
