import React from 'react';
import {useAuth0} from "../auth0-wrapper";
import Button from "./Button"

const Login = () => {
    const { loading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    // Prevent the state of the Login Button from changing while loading.
    if (loading) return <div>Loading...</div>
    else if (!isAuthenticated) {
        return (
            <div>
                <Button
                    action={loginWithRedirect}
                    title={'LOG IN'}
                    type={'btn btn-primary'}>
                </Button>
            </div>
        )
    }
    else {
        return (
            <div>
                <Button
                    action={logout}
                    title={'LOG OUT'}
                    type={'btn btn-danger'}>
                </Button>
            </div>    
        )
    }
}

export default Login;
