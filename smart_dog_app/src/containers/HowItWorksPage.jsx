import React, { Component } from 'react';
import { Grid, Cell, Tabs, Tab } from 'react-mdl';

class Works extends Component {
    constructor(props) {
        super(props);
        this.state = { activeTab: 0 };
    }
    //toggle method to call tabs
    toggleCategories() {
        if(this.state.activeTab === 0) {
            return(
                <div style={{width: '100%', margin: 'auto'}}>
                    <Grid className= 'range-connectivity-grid'>
                        <Cell col= {12}>
                            <img
                                src="https://tinyurl.com/y255hvlk"
                                alt="rang-conn"
                                className="tab-img"
                            />
                            <div className= "banner-header">
                                <h1>Range + Connectivity</h1>
                            </div>
                        </Cell>
                    </Grid>
                </div>
            )
        } else if (this.state.activeTab === 1) {
            return(
                <div style={{width: '100%', margin: 'auto'}}>
                    <Grid className= 'tracking-grid'>
                        <Cell col= {12}>
                            <img
                                src="https://tinyurl.com/y6oo5daj"
                                alt="tracking"
                                className="tab-img"
                            />
                            <div className= "banner-header">
                                <h1>Tracking</h1>
                            </div>
                        </Cell>
                    </Grid>
                </div>
            )
        } else if (this.state.activeTab === 2) {
            return(
                <div style={{width: '100%', margin: 'auto'}}>
                    <Grid className= 'specs-grid'>
                        <Cell col= {12}>
                            <img
                                src="https://tinyurl.com/y6bmzktr"
                                alt="specs"
                                className="tab-img"
                            />
                            <div className= "banner-header">
                                <h1>Technical Specifications</h1>
                            </div>
                        </Cell>
                    </Grid>
                </div>
            )
        }
    }

    render() {
        return(
            <div className="category-tabs">
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab>Range + Connectivity</Tab>
                    <Tab>Tracking</Tab>
                    <Tab>Technical Specifications</Tab>
                </Tabs>
                <section className="features-grid">
                    {this.toggleCategories()}
                </section>
            </div>   
        )
    }
}

export default Works;