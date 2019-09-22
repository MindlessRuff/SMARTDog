import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';
import SignupFormContainer from './containers/SignupFormContainer';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/main';
import { Link } from 'react-router-dom';

// Top level app to instantiate any containers
class App extends Component {
    render() {
        return (
            <div className="demo-big-content">
                <Layout>
                    <Header title="SMARTDog" scroll>
                        <Navigation>
                            <Link to="/about">About</Link>
                            <Link to="/product">Product</Link>
                            <Link to="/works">How It Works</Link>
                            <Link to="/login">Log In</Link>
                        </Navigation>
                    </Header>
                    <Drawer title="SMARTDog">
                        <Navigation>
                            <Link to="/about">About</Link>
                            <Link to="/product">Product</Link>
                            <Link to="/works">How It Works</Link>
                            <Link to="/login">Log In</Link>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <Main/>
                        {/* <div className='container'><SignupFormContainer /></div>/> */}
                    </Content>
                </Layout>
            </div>         
        );
    }
}
render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));