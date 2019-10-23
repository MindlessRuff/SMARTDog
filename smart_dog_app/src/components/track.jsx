import React from 'react';
import { useAuth0 } from "../auth0-wrapper";

const Track = () => {
    const { loading, isAuthenticated, loginWithRedirect} = useAuth0();
    if (!loading && !isAuthenticated) {
        loginWithRedirect();
    }

    return (
        <div><h1>Tracking Page</h1></div>
    )

}

export default Track;
