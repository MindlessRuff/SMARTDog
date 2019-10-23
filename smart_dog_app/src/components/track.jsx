import React, { Component } from 'react';
import {useAuth0} from "../auth0-wrapper";

const Track = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    if (isAuthenticated) {
        return(
            <div><h1>Tracking Page</h1></div>
        )
    }
    else {
        return(
            <div><h1>Log In to Track</h1></div>
        )
    }
}

export default Track;
