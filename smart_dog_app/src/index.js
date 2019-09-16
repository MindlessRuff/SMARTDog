import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';
import SignupFormContainer from './containers/SignupFormContainer';

// Top level app to instantiate any containers
class App extends Component {
    render() {
        return (
            <div className='container'>
                <h4> Temporary Example Sign-Up Form</h4>          
                <div><SignupFormContainer /></div>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));