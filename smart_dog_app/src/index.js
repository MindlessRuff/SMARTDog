import React, {Component} from 'react';
import CustomerFormContainer from './containers/CustomerFormContainer';

import {render} from 'react-dom';
import './index.css';

class App extends Component {
    render() {
        return (
            <div className='col-md-4'>
                <h4> Temporary Example Sign-Up Form</h4>
                <CustomerFormContainer/>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));