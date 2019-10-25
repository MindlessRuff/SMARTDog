import React from 'react';
import Button from '../components/Button';
import SignupFormContainer from "./SignupFormContainer";
import axios from 'axios';
import { useAuth0 } from '../auth0-wrapper';

class ProfileDisplayPage extends Component {

    render() {
        // Grab the user values passed in from 
        // the parent container (SignupForm)
        // That way value will update when the state
        // of the parent is updated, like with clear
        // and any future functions.
        
        const {values} = this.props;
        return (
            <div>
                <p>{}</p>
            </div>
        )
    }

}

export default ProfileDisplayPage;