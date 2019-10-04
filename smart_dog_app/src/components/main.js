import React from 'react';
import LandingPage from './landingpage';
import About from './about';
import Works from './works';
import Login from './login';

import { Switch, Route } from 'react-router-dom';


const Main = () => (
    <Switch>
        <Route exact path ="/" component= {LandingPage} />
        <Route path ="/about" component= {About} />
        <Route path ="/works" component= {Works} />
    </Switch>
)

export default Main;