import React from 'react';
import Button from '../components/Button';
import SignupFormContainer from "./SignupFormContainer";
import axios from 'axios';
import { useAuth0 } from '../auth0-wrapper';

const ProfilePage = () => {
    const { user } = useAuth0();    // Grab user data with auth0 hook. Have to call inside const component.
    return (
        <SignupFormContainer user={user}/>
    )
}

export default ProfilePage;