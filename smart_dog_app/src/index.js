import React, {Component} from 'react';
import CustomerFormContainer from './containers/CustomerFormContainer';
import CustomerLogin from './containers/CustomerLogin';

import {render} from 'react-dom';
import './index.css';

class App extends Component {
    render() {
        return (
            <div className='container'>
				<h4>Customer Login</h4>
				<CustomerLogin/>
				
                <h4>Temporary Example Sign-Up Form</h4>
				<CustomerFormContainer/>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));