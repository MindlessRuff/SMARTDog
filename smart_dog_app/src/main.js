<<<<<<< HEAD
import React from "react";
import LandingPage from "./containers/LandingPage";
import About from "./containers/AboutPage";
import Works from "./containers/HowItWorksPage";
import Track from "./containers/TrackPage";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route } from "react-router-dom";

const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/about" component={About} />
    <Route path="/works" component={Works} />
    <PrivateRoute path="/track" component={Track} />
  </Switch>
);
=======
import React from 'react';
import LandingPage from './containers/LandingPage';
import About from './containers/AboutPage';
import Works from './containers/HowItWorksPage';
import Track from './containers/TrackPage';
import PrivateRoute from './components/PrivateRoute';
import { Switch, Route } from 'react-router-dom';
import ProfilePage from './containers/ProfilePage';

const Main = () => (
    <Switch>W
        <Route exact path ="/" component= {LandingPage} />
        <Route path ="/about" component= {About} />
        <Route path ="/works" component= {Works} />
        <PrivateRoute path ="/track" component= {Track} />
        <Route path ="/profile" component= {ProfilePage} />
    </Switch>
)
>>>>>>> eeefd11e6329b1fb38ea7fabdbb651b70c6c9356

export default Main;
