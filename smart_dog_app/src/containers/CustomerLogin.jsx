import React, {Component} from 'react';
import Input from '../components/Input';

class CustomerLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUser: {
                userName: '',
                passWord: '',
            },
        };
        
    }
    
    handleUserName = (event) => {
        let value = event.target.value;
        this.setState (function(prevState) {
            return {
                newUser: {
                    // Keep previous state of newUser, only add
                    // the new field (userName). ... syntax collects all
                    // the previous fields of newUser if they exist.
                    ...prevState.newUser,
                    userName: value,
                }
            }
        });
    }

    handlePassWord = (event) => {
        let value = event.target.value;
        this.setState (function(prevState) {
            return {
                newUser: {
                    // Keep previous state of newUser, only add
                    // the new field (passWord). ... syntax collects all
                    // the previous fields of newUser if they exist.
                    ...prevState.newUser,
                    passWord: value,
                }
            }
        });
    }
    
    render() {
  
      return (
        <form className="root-container">
                <Input
                    inputtype={'text'}
                    title={'Username'}
                    name={'userName'}
                    value={this.state.newUser.userName}
                    placeholder={''}
                    handlechange={this.handleUserName}              
                />
                <Input
                    inputtype={'text'}
                    title={'Password'}
                    name={'passWord'}
                    value={this.state.newUser.passWord}
                    placeholder={''}
                    handlechange={this.handlePassWord}              
                />
        </form>
      );
    }
}

export default CustomerLogin;