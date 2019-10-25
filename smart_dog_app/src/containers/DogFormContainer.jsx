import React, {Component} from 'react';
import Input from '../components/Input';
import PropTypes from 'prop-types';     // Prop-types can be used to require certain fields to be filled out.

class DogFormContainer extends Component {

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
                    title={'Dog\'s Name'}
                    name={'dogName'}
                    value={values.dogName}
                    placeholder={''}
                    // Pass the parent handleInputChange method
                    // to update parent state anytime fields
                    // are changed.
                    handlechange={this.props.handleInputChange}
                />
                <Input
                    type={'text'}
                    title={'Dog\'s Breed'}
                    name={'dogBreed'}
                    value={values.dogBreed}
                    placeholder={''}
                    handlechange={this.props.handleInputChange}
                />
            </div>
        )
    }
}

export default DogFormContainer;