import React from 'react';
import {useAuth0} from "../auth0-wrapper";
import Button from "./Button"

const Login = () => {
    const { loading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    if (loading) return <div>Loading...</div>   // Still weird functionality, but better than the button switching from login to logout on load.
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