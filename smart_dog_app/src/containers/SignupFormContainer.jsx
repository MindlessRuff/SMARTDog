import React, {Component} from 'react';
import Button from '../components/Button';
import CustomerFormContainer from './CustomerFormContainer';
import axios from 'axios';

let port = 3000;
// This Signup form container is the top-level component
// of the signup page. It holds all the state (variables)
// and passes the variables down to its children components,
// the individual (dog, user) containers, and from there to the textboxes
// to keep those boxes populated with this top-level state.
class SignupFormContainer extends Component {
    port = 3000;
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                first: '',
                last: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
            },
            message: ''
        };
        let id;     // Stores the database id on the initial page load -> get request.
    }   

    componentDidMount() {
        let email = this.props.user.email;
        // Need to use arrow functions with axios calls so that 'this' variable will
        // refer to the class component instead of axios.
        axios.get(`http://localhost:${port}/users?email=${email}`).then(response => {
            let fetchedData = response.data[0].userInfo;
            this.setState({userInfo: fetchedData, message: ''});   // [0] index since entries keyed by email are unique
            this.id = response.data[0].id;
            console.log(this.state);
        })
        .catch(error => {
            axios.post(`http://localhost:${port}/users`,{email: this.props.user.email, userInfo: this.state.userInfo, message: ''});
            axios.get(`http://localhost:${port}/users?email=${email}`).then(response => {
                let fetchedData = response.data[0].userInfo;
                this.setState({userInfo: fetchedData, message: ''});   // [0] index since entries keyed by email are unique
                this.id = response.data[0].id;
            })
            .catch(error => {
                console.log(error);
            });
        });
    }


    // Input change event is passed to all children in render
    // components so it triggers the parent (this form) 
    // to update its state
    handleInputChange = (event) => {
        this.setState({userInfo: {...this.state.userInfo, [event.target.name]: event.target.value}, message: ''});
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        let email = this.props.user.email;
        let userInfo = this.state.userInfo;
        this.setState({message: 'Processing...'});
        console.log(this.state.message);
        // Insert the id of the current user into the put request, can't do it with email key.
        axios.put(`http://localhost:${port}/users/${this.id}`, {email: email, userInfo: userInfo})
        .catch(error => {
            console.log(error);
        });
        this.setState({message: 'Profile Updated'});
    }

    handleFormClear = (event) => {
        event.preventDefault();
        this.setState( {
            first: '',
            last: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            message: '',
        });
    }

    render() {
        console.log('SignupContainer render');
        // Destructure state into variables to pass into child components.
        // This will keep the child component textboxes populated with
        // the parent's variables. It also will change child component
        // state anytime a parent function is called, like clear or submit.
        const {first, last, address, city, state, zipCode} = this.state.userInfo;
        const userValues = {first, last, address, city, state, zipCode};
        const {user} = this.props;
        
        return (
            <form className='container-fluid'
            onSubmit={this.handleFormSubmit}>
                <div className='container'>
                    <CustomerFormContainer 
                        handleInputChange={this.handleInputChange}
                        values={userValues}
                    />
                </div>
                <div className='container'>
                    <Button
                        action={this.handleFormSubmit}
                        type={'btn btn-primary'}
                        title={'Update'}
                    /> 
                </div>
                <div className="result">{this.state.message}</div>
            </form>
        )
    }
}

export default SignupFormContainer;