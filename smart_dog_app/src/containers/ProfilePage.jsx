import React from 'react';
import SignupFormContainer from "./SignupFormContainer";
import { useAuth0 } from '../auth0-wrapper';
import ProfileDisplayPage from './ProfileDisplayPage';

const ProfilePage = () => {
<<<<<<< HEAD
    const { user } = useAuth0();
    console.log(user);
    return (
       <div><SignupFormContainer user={user}/>
       {/*<ProfileDisplayPage user={user}/>*/}</div>
=======
    const { loading, user } = useAuth0();    // Grab user data with auth0 hook. Have to call inside const component.
    
    // Wait until auth0 fetches the user data before continuing. I think
    // this acts as a kind of busy while loop until user data is ready.
    if (loading || !user) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <SignupFormContainer email={user.email}/>
>>>>>>> 53f9bfdcf1ca3f630f134dec44b2a35502a9e582
    )
}

export default ProfilePage;