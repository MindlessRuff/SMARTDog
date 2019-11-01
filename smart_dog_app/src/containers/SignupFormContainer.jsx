import React, {Component} from 'react';
import Button from '../components/Button';
import CustomerFormContainer from './CustomerFormContainer';
import DogFormContainer from './DogFormContainer';
import axios from 'axios';
import {useAuth0} from "../auth0-wrapper";


// This Signup form container is the top-level component
// of the signup page. It holds all the state (variables)
// and passes the variables down to its children components,
// the individual (dog, user) containers, and from there to the textboxes
// to keep those boxes populated with this top-level state.
class SignupFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
        };
    }   


    // componentDidMount() {
    //     console.log(this.props);
        
    //     axios.get(`http://localhost:3006/users`).then(function(response) {
    //         console.log(response);
    //     })
        
    // }
    // Input change event is passed to all children in render
    // components so it triggers the parent (this form) 
    // to update its state
    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        let email = this.props.user.email;
        console.log(email);
        let postData = {
            [email]: this.state,
        }
        // Post to REST (json.db), must npm install json-server
        // and npm install axios -> 'npm run json:server --watch db.json'
        axios.post(`http://localhost:3006`).then(function(response){
            console.log(response);
        })
    
        // persist the user_metadata update
        //auth0.users.updateUserMetadata(user.user_id, user.user_metadata)
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
            email: ''
        });
    }

    render() {
        // Destructure state into variables to pass into child components.
        // This will keep the child component textboxes populated with
        // the parent's variables. It also will change child component
        // state anytime a parent function is called, like clear or submit.
        const {first, last, address, city, state, zipCode} = this.state;
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
                        title={'Submit'}
                    />
                    <Button
                        action={this.handleFormClear}
                        type={'btn btn-secondary'}
                        title={'Clear Form'}
                    />  
                </div>
            </form>
        )
    }
}

export default SignupFormContainer;