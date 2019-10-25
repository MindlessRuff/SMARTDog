import React from 'react';
import Button from '../components/Button';
import SignupFormContainer from "./SignupFormContainer";
import axios from 'axios';
import { useAuth0 } from '../auth0-wrapper';

const ProfilePage = () => {
    const { user } = useAuth0();
    console.log(user);
    return (
        <SignupFormContainer/>
    )
}

export default ProfilePage;