import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import CustomerLogin from '../containers/CustomerLogin';
import SignupFormContainer from '../containers/SignupFormContainer';
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
           /* <div>
                <Router>
                    <div className="App">
                    <div className="App__Aside"></div>
                    <div className="App__Form">
                        <div className="PageSwitcher">
                            <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                            <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                        </div>
            
                        <div className="FormTitle">
                            <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> / 
                            <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                        </div>
            
                        <Route exact path="/" component={SignupFormContainer}>
                        </Route>
                        <Route path="/sign-in" component={CustomerLogin}>
                        </Route>
                    </div>
                    </div>
                </Router>
            </div>*/
            
        )
    
}

export default Login;