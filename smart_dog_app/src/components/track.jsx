import React from 'react';
import { useAuth0 } from "../auth0-wrapper";

const Track = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
        return(
            <div><h1>Tracking Page</h1></div>
        )
}

export default Track;
