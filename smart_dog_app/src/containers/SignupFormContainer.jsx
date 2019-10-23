import React, {Component} from 'react';
import Button from '../components/Button';
import CustomerFormContainer from './CustomerFormContainer';
import DogFormContainer from './DogFormContainer';
import axios from 'axios';

class SignupFormContainer extends Component {
    
    // This Signup form container is the top-level component
    // of the signup page. It holds all the state (variables)
    // and passes the variables down to its children components,
    // the individual (dog, user) containers, and from there to the textboxes
    // to keep those boxes populated with this top-level state.
    
    state = {
        firstName: '',
        lastName: '',
        email: '',
        dogName: '',
        dogBreed: '',
    };

    // Input change event is passed to all children in render
    // components so it triggers the parent (this form) 
    // to update its state
    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let postData = {
            [email]: this.state,
        }
        // Create an object with email as the primary key,
        // then remove email from the post data to avoid
        // double saving the key.
        delete(postData[this.state.email]['email']);
        this.setState( {
            firstName: '',
            lastName: '',
            email: '',
            dogName: '',
            dogBreed: '',
        });
        // Post to REST (json.db), must npm install json-server
        // and npm install axios -> 'npm run json:server --watch db.json'
        axios.post('http://localhost:3000/users', postData);
    }

    handleFormClear = (event) => {
        event.preventDefault();
        this.setState( {
            firstName: '',
            lastName: '',
            email: '',
            dogName: '',
            dogBreed: '',
        });
    }

    render() {
        // Destructure state into variables to pass into child components.
        // This will keep the child component textboxes populated with
        // the parent's variables. It also will change child component
        // state anytime a parent function is called, like clear or submit.
        const {firstName, lastName, email, 
        dogName, dogBreed} = this.state;

        const userValues = {firstName, lastName, email};
        const dogValues = {dogName, dogBreed};
        const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
        if (isAuthenticated) {
            return (
                <form className='container-fluid'
                onSubmit={this.handleFormSubmit}>
                    <div className='container'>
                        <CustomerFormContainer 
                            handleInputChange={this.handleInputChange}
                            values={userValues}
                        />
                        <DogFormContainer
                            handleInputChange={this.handleInputChange}
                            values={dogValues}
                        />
                    </div>
                    <div className='container'>
                        <Button
                            action={this.handleFormSubmit}
                            type={'primary'}
                            title={'Submit'}
                        />
                        <Button
                            action={this.handleFormClear}
                            type={'secondary'}
                            title={'Clear Form'}
                        />  
                    </div>
                </form>
            )
        }
        else {
            return (
                <div><h1>Log in</h1></div>
            )
        }
    }
}

export default SignupFormContainer;