import React from "react";
import LandingPage from "./containers/LandingPage";
import About from "./containers/AboutPage";
import Works from "./containers/HowItWorksPage";
import Store from "./containers/Store";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route, Redirect } from "react-router-dom";
import GoogleMapsPage from "./containers/GoogleMapsPage";
import SignupFormContainer from "./containers/SignupFormContainer";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/about/" component={About} />
      <Route path="/works/" component={Works} />
      <Route path="/store/" component={Store} />
      <PrivateRoute path="/track/" component={GoogleMapsPage} />
      <PrivateRoute path="/profile/" component={SignupFormContainer} />
    </Switch>
  );
};

export default Main;
