import React, {Component} from 'react';
import Input from '../components/Input';
import PropTypes from 'prop-types';

class CustomerFormContainer extends Component {

    render() {
        // Grab the user values passed in from 
        // the parent container (SignupForm)
        // That way value will update when the state
        // of the parent is updated, like with clear
        // and any future functions.
        const {values} = this.props;
        return (
            <div className='col-md-6'>
                <Input
                    type={'text'}
                    title={'First Name'}
                    name={'firstName'}
                    value={values.first}
                    placeholder={''}
                    // Pass the parent handleInputChange method
                    // to update parent state anytime fields
                    // are changed.
                    handlechange={this.props.handleInputChange}             
                />
                <Input
                    type={'text'}
                    title={'Last Name'}
                    name={'lastName'}
                    value={values.last}
                    placeholder={''}
                    handlechange={this.props.handleInputChange}
                />
                <Input
<<<<<<< HEAD
                    type={'email'}
                    title={'Email'}
                    name={'email'}
                    value={values.email}
=======
                    type={'text'}
                    title={'Address'}
                    name={'address'}
                    value={values.address}
                    placeholder={''}
                    handlechange={this.props.handleInputChange}
                />
                <Input
                   type={'text'}
                   title={'City'}
                   name={'city'}
                   value={values.city}
                   placeholder={''}
                   handlechange={this.props.handleInputChange}
                />
                <Input
                    type={'text'}
                    title={'State'}
                    name={'state'}
                    value={values.state}
                    placeholder={''}
                    handlechange={this.props.handleInputChange}
                />
                <Input
                    type={'text'}
                    title={'Zip Code'}
                    name={'zip_code'}
                    value={values.zipCode}
>>>>>>> have auth0 working without having to delete cookies now, fixed variable names
                    placeholder={''}
                    handlechange={this.props.handleInputChange}
                />
            </div>
        )
    }

}

export default CustomerFormContainer;