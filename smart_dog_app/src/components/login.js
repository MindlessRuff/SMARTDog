import React, { Component } from 'react';
import {useAuth0} from "../auth0-wrapper";


const Login = () => {
        const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
        return(
            <div>
                {!isAuthenticated && (
                    <button
                        onClick={() =>
                        loginWithRedirect({})
                    }>
                        LOG IN
                    </button>
                )}

                {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
            </div>            
        )
    
}

export default Login;