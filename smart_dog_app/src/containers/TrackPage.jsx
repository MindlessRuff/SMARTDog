import React, { Component } from 'react';

/* Leave as a state-less class for now. If multiple components will be on this page, state should
   be with the lowest common parent of all children that use the state. If this ends up not being the lowest
   common parent, change this to a functional component (const Track = () => ) */
class Track extends Component {
state = {
    data: null
    };

    componentDidMount() {
        // Call the fetch function after the component has mounted
        this.callBackendAPI()
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }

    // Function which will fetch the GET route from the json-server API
    callBackendAPI = async () => {
        const response = await fetch('/track/api');
        const body = await response.text();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };


    render() {
        return(
            <div><h1>{this.state.data}</h1></div>
        )
    }
}

export default Track;
