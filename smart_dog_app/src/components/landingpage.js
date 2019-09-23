import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';


class LandingPage extends Component {
    render(){
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <grid classname= 'landing-grid'>
                    <cell col= '12'></cell>
                </grid>
            <h1>Landing Page</h1>
            </div>
        )
    }
}

export default LandingPage;