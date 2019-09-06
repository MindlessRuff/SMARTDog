import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class CustomerForm extends React.Component  
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        this.setState({value: event.target.value});
    }

    handleSubmit(event)
    {
        alert('Fuck you ' + this.state.value);
        event.preventDefault();
    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <br />
                <label>
                    First Name:
                </label>
                <input type='text' value={this.state.value}
            onChange={this.handleChange} />
                <input type='submit' value='Submit' />
            </form>
        );
    }
}

ReactDOM.render(
    <CustomerForm />,
    document.getElementById('root'),
);