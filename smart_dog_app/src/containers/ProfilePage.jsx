import React from 'react';
import SignupFormContainer from "./SignupFormContainer";
import { useAuth0 } from '../auth0-wrapper';

const ProfilePage = () => {
    const { loading, user } = useAuth0();    // Grab user data with auth0 hook. Have to call inside const component.
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