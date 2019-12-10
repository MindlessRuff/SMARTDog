import React, { Component } from "react";
import Button from "../components/Button";
import CustomerFormContainer from "./CustomerFormContainer";
import axios from "axios";
import DogFormContainer from "./DogFormContainer";
import { Redirect } from "react-router-dom";

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
        zipCode: "",
        phone: ""
      },
      dogInfo: {
        dogName: "",
        dogBreed: ""
      },
      message: ""
    };
    this.id = undefined;
  }

  componentDidMount() {
    let email = this.props.email;
    // Need to use arrow functions with axios calls so that 'this' variable will
    // refer to the class component instead of axios.
    axios
      .get(`/api/users?email=${email}`)
      .then(response => {
        let fetchedData = response.data[0].userInfo;
        let fetchedDog = response.data[0].dogInfo;
        this.setState({
          dogInfo: fetchedDog,
          userInfo: fetchedData,
          message: ""
        }); // [0] index since entries keyed by email are unique
        console.log(response);
        this.id = response.data[0].id;
        console.log(this.state);
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

  handleFormSubmit = event => {
    event.preventDefault();
    let email = this.props.email;
    let userInfo = this.state.userInfo;
    let dogInfo = this.state.dogInfo;
    this.setState({ message: "Processing..." });
    // Insert the id of the current user into the put request, can't do it with email key.
    console.log(email, userInfo, this.id);
    axios
      .patch(`/api/users/${this.id}`, {
        email: email,
        userInfo: userInfo,
        dogInfo: dogInfo
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

  handleDogInfo = event => {
    event.preventDefault();

    this.setState({
      dogInfo: {
        ...this.state.dogInfo,
        [event.target.name]: event.target.value
      }
    });
  };

  render() {
    // Destructure state into variables to pass into child components.
    // This will keep the child component textboxes populated with
    // the parent's variables. It also will change child component
    // state anytime a parent function is called, like clear or submit.
    const {
      first,
      last,
      address,
      city,
      state,
      zipCode,
      phone
    } = this.state.userInfo;
    const userValues = { first, last, address, city, state, zipCode, phone };
    const petValues = this.state.dogInfo;

    return this.state.redirect === true ? (
      <Redirect to="/dog" />
    ) : (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <div className="container">
          <div className="row">
            <CustomerFormContainer
              handleInputChange={this.handleInputChange}
              values={userValues}
            />
            <DogFormContainer
              handleInputChange={this.handleDogInfo}
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
          </div>
        </div>
        <div className="result">{this.state.message}</div>
      </form>
    );
  }
}

export default SignupFormContainer;
