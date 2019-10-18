import React, {Component} from 'react';

class Account extends Component {
    render(){
        return(
            <fieldset>
                <legend>Account</legend>
                <p>
                <input type="text" id="first_name" placeholder="First" required/>
                </p>
                <p>
                <input type="text" id="last_name" placeholder="Last"
                        required/>
                </p>
                <p>
                <input type="text" id="address" placeholder="Address" required/>
                </p>
                <input type="submit" value="Update"/>
            </fieldset>
        )
    }
}

export default Account;

