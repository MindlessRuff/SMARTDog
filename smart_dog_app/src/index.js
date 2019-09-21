import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';
import SignupFormContainer from './containers/SignupFormContainer';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';

// Top level app to instantiate any containers
class App extends Component {
    render() {
        return (
            <div className="demo-big-content">
                <Layout>
                    <Header title="Title" scroll>
                        <Navigation>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                        </Navigation>
                    </Header>
                    <Drawer title="Title">
                        <Navigation>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                            <a href="#">Link</a>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <div className='container'><SignupFormContainer /></div>/>
                        
                    </Content>
                </Layout>
            </div>         
        );
    }
}

render(<App />, document.getElementById('root'));