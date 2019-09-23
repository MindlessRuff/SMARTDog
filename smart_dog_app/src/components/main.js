import React from 'react';

import LandingPage from './landingpage';
import About from './about';
import Product from './product';
import Works from './works';
import Login from './login';

import { Switch, Route } from 'react-router-dom';


const Main = () => (
    <Switch>
        <Route exact path ="/" component= {LandingPage} />
        <Route path ="/about" component= {About} />
        <Route path ="/product" component= {Product} />
        <Route path ="/works" component= {Works} />
        <Route path ="/login" component= {Login} />
    </Switch>
)

export default Main;