import React from "react";
import LandingPage from "./containers/LandingPage";
import About from "./containers/AboutPage";
import Works from "./containers/HowItWorksPage";
import Track from "./containers/TrackPage";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import ProfilePage from "./containers/ProfilePage";

const Main = () => (
<<<<<<< HEAD
    <Switch>W
        <Route exact path ="/" component= {LandingPage} />
        <Route path ="/about" component= {About} />
        <Route path ="/works" component= {Works} />
        <PrivateRoute path ="/track" component= {Track} />
        <PrivateRoute path ="/profile" component= {ProfilePage} />
    </Switch>
)
=======
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/about" component={About} />
    <Route path="/works" component={Works} />
    <PrivateRoute path="/track" component={Track} />
    <PrivateRoute path="/profile" component={ProfilePage} />
  </Switch>
);
>>>>>>> 53f9bfdcf1ca3f630f134dec44b2a35502a9e582

export default Main;
