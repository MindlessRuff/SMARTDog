import React from 'react';
import LandingPage from './containers/LandingPage';
import About from './containers/AboutPage';
import Works from './containers/HowItWorksPage';
import Track from './containers/TrackPage';
import PrivateRoute from './components/PrivateRoute';
import { Switch, Route } from 'react-router-dom';
import Profile from './containers/SignupFormContainer';


const Main = () => (
    <Switch>W
        <Route exact path ="/" component= {LandingPage} />
        <Route path ="/about" component= {About} />
        <Route path ="/works" component= {Works} />
        <PrivateRoute path ="/track" component= {Track} />
        <Route path = "/profile" component = {Profile} />
    </Switch>
)

export default Main;