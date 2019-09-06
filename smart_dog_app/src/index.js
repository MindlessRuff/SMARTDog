import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

<<<<<<< HEAD
class CustomerForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
          </label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
          <div>
            <label>
                Last Name:
            </label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </div>
        </form>
      );
    }
  }

  ReactDOM.render(
      <CustomerForm/>,
      document.getElementById('root')
  )
=======
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
>>>>>>> 8a85ce39e905367b124c3b9a4e1adbd6bf1cc074
