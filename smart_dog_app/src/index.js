import React, {Component} from 'react';
import CustomerFormContainer from './containers/CustomerFormContainer';

import {render} from 'react-dom';
import './index.css';

class App extends Component {
    render() {
        return (
            <div className='container'>
                <h4> Temporary Example Sign-Up Form</h4>
                
                <CustomerFormContainer/>
            </div>
        );
    }
}

<<<<<<< HEAD
ReactDOM.render(
    <CustomerForm />,
    document.getElementById('root'),
);
=======
render(<App />, document.getElementById('root'));
>>>>>>> 4c39021c6c237e6af4c379d8624ec532a338c58e
