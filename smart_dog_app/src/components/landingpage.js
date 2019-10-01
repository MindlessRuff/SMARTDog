import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import { View, Text } from 'rea';


class LandingPage extends Component {
    render(){
        return(
            <div style={{width: '100%', margin: 'auto'}}>
                <Grid className= 'landing-grid'>
                    <Cell col= {12}>
                        <img
                            src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                            alt="landing"
                            className="landing-img"
                        />
                        <div className= "banner-header">
                            <h1>Introducing SMARTDog</h1>
                        </div>
                    </Cell>
                </Grid>
            </div>
        )
    }
}

export default LandingPage;