import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            First: '',
            Last: '',
            Adress: '',
            City: '',
            State: '',
            ZipCode: '',
            hasAgreed: false
        };

    }

    render() {
        return (
        <div className="FormCenter">

        </div>
        );
    }
}
export default SignUpForm;