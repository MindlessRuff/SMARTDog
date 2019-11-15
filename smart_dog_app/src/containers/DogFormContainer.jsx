import React, { Component } from "react";
import Input from "../components/Input";
import PropTypes from "prop-types"; // Prop-types can be used to require certain fields to be filled out.
import Button from "../components/Button";

class DogFormContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dogInfo:{
        dogName: "",
        Breed: "",
        EUI: "",
      },
      message: "",
    };
    let id;
  }

  componentDidMount() {
    let email = this.props.email;
    // Need to use arrow functions with axios calls so that 'this' variable will
    // refer to the class component instead of axios.
    axios
      .get(`/dog?email=${email}`)
      .then(response => {
        let fetchedData = response.data[0].dogInfo;
        this.setState({ dogInfo: fetchedData, message: "" }); // [0] index since entries keyed by email are unique
        this.id = response.data[0].id;
        console.log('incomponentdidmount', this.state);
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleFormSubmit = event => {
    event.preventDefault();
    let email = this.props.email;
    let userInfo = this.state.userInfo;
    this.setState({ message: "Processing..." });
    // Insert the id of the current user into the put request, can't do it with email key.
    console.log(email, userInfo, this.id);
    axios
      .put(`/users/${this.id}`, {
        email: email,
        userInfo: userInfo
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

  handleDogInput = event => {
    this.setState({
      dogInfo:{
        ...this.state.dogInfo,
        [event.targe.name]: event.target.value
      }
    })
  }

  handleAdd = event => {
    event.preventDefault();
    let email = this.props.email;
    let dogInfo = this.props.values;
    this.props.update = false;
    // Insert the id of the current user into the put request, can't do it with email key.
    axios
      .post(`/dog`, {
        email: email,
        dogInfo: dogInfo
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUpdate = event => {
    event.preventDefault();
    let email = this.props.email;
    let dogInfo = this.props.values;
    this.props.update = false;
    // Insert the id of the current user into the put request, can't do it with email key.
    axios
      .put(`/dog/${this.props.id}`, {
        email: email,
        dogInfo: dogInfo
      })
      .catch(error => {
        console.log(error);
      });
  };
    // Grab the user values passed in from
    // the parent container (SignupForm)
    // That way value will update when the state
    // of the parent is updated, like with clear
    // and any future functions.
  render (){
    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <div className="container">
          <CustomerFormContainer
            handleInputChange={this.handleInputChange}
            values={userValues}
          />
        </div>
        <div className="container">
          <div className="row">
          <Button
            action={this.handleFormSubmit}
            type={"btn btn-primary"}
            title={"Update"}
          />
          <Button
            action={this.handleDogInfo}
            type={"btn btn-primary"}
            title={"Dog Info"}
            />
        </div>
        </div>
        <div className="result">{this.state.message}</div>
      </form>
    );
  }
}

export default DogFormContainer;
