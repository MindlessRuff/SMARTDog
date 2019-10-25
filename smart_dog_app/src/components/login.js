<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
=======
import React, { Component } from 'react';
>>>>>>> h
=======
import React from 'react';
>>>>>>> 5b7bd0991b7405d16ccc6931bb3d34288932ad40
import {useAuth0} from "../auth0-wrapper";
import Button from "./Button"

const Login = () => {
        const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
        if (!isAuthenticated) {
            return (
                <div>
                    <Button
                        action={loginWithRedirect}
                        title={'LOG IN'}
                        type={'btn btn-primary'}
                    />
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button
                        action={logout}
                        title={'LOG OUT'}
                        type={'btn btn-danger'}
                    />
                </div>    
            )
        }
}

export default Login;