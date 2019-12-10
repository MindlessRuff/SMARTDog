import React, { Component } from "react";
import { Grid, Cell, Tabs, Tab } from "react-mdl";
import Footer from "../components/Footer";

class Works extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  //toggle method to call tabs
  toggleCategories() {
    if (this.state.activeTab === 0) {
      return (
        <div style={{ width: "100%", margin: "auto" }}>
          <Grid className="tab-img">
            <Cell col={12}>
              <div>
                <iframe
                  src="https://youtube.com/embed/3st8zI1uBqw"
                  className="tab-img"
                  alt="tabimg"
                />
              </div>
              <div className="banner-header">
                <h1>Demo</h1>
                <p>Hope you guys enjoyed the demo</p>
              </div>
            </Cell>
          </Grid>
        </div>
      );
    } else if (this.state.activeTab === 1) {
      return (
        <div style={{ width: "100%", margin: "auto" }}>
          <Grid className="img-grid">
            <Cell col={12}>
              <img
                src="https://tinyurl.com/y255hvlk"
                alt="rang-conn"
                className="tab-img"
              />
              <div className="banner-header">
                <h1>Range + Connectivity</h1>
                <h3>Coming 12/11/2019</h3>
              </div>
            </Cell>
          </Grid>
        </div>
      );
    } else if (this.state.activeTab === 2) {
      return (
        <div style={{ width: "100%", margin: "auto" }}>
          <Grid className="img-grid">
            <Cell col={12}>
              <img
                src="https://tinyurl.com/y6oo5daj"
                alt="tracking"
                className="tab-img"
              />
              <div className="banner-header">
                <h1>Tracking</h1>
                <h3>Coming 12/11/2019</h3>
              </div>
            </Cell>
          </Grid>
        </div>
      );
    } else if (this.state.activeTab === 3) {
      return (
        <div style={{ width: "100%", margin: "auto" }}>
          <Grid className="img-grid">
            <Cell col={12}>
              <img
                src="https://tinyurl.com/y6bmzktr"
                alt="specs"
                className="tab-img"
              />
              <div className="banner-header">
                <h1>Technical Specifications</h1>
                <h3>Coming 12/11/2019</h3>
              </div>
            </Cell>
          </Grid>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="category-tabs">
          <Tabs
            activeTab={this.state.activeTab}
            onChange={tabId => this.setState({ activeTab: tabId })}
            ripple
          >
            <Tab>Demo</Tab>
            <Tab>Range + Connectivity</Tab>
            <Tab>Tracking</Tab>
            <Tab>Technical Specifications</Tab>
          </Tabs>
          <section className="features-grid">{this.toggleCategories()}</section>
        </div>
      </div>
    );
  }
}

export default Works;
