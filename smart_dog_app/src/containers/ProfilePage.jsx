import React from 'react';
import SignupFormContainer from "./SignupFormContainer";
import { useAuth0 } from '../auth0-wrapper';
import axios from 'axios';

const ProfilePage = () => {
    const { loading, user } = useAuth0();    // Grab user data with auth0 hook. Have to call inside const component.
    let port = 3000;
    
    // Wait until auth0 fetches the user data before continuing. I think
    // this acts as a kind of busy while loop until user data is ready.
    if (loading || !user) {
        return (
            <div>Loading...</div>
        );
    }
    
    
    return (
        <SignupFormContainer email={user.email}/>
    )
}

export default ProfilePage;