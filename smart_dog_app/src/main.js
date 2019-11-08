import React from "react";
import LandingPage from "./containers/LandingPage";
import About from "./containers/AboutPage";
import Works from "./containers/HowItWorksPage";
import Track from "./containers/TrackPage";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import ProfilePage from "./containers/SignupFormContainer";
import { useAuth0 } from './auth0-wrapper';

const Main = (props) => {
  const { user } = useAuth0();
  return(
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/about" component={About} />
      <Route path="/works" component={Works} />
      <PrivateRoute path="/track" component={Track} />
      <PrivateRoute path="/profile" render={(props) => <ProfilePage {...{user}} />} />
    </Switch>
  );
};

export default Main;
