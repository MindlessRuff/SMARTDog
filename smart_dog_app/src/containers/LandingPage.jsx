import React from "react";
import { Grid, Cell } from "react-mdl";

const LandingPage = () => {
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Grid className="landing-grid">
        <Cell col={12}>
          <img
            src="https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            alt="landing"
            className="landing-img"
          />
          <div className="banner-header">
            <h1>WOW SMARTDog</h1>
            <p className="banner-text">
              Enter some text here (slogan maybe?) about SMARTDog
            </p>
          </div>
        </Cell>
        <div>
          <img
            src="https://tinyurl.com/yykufexl"
            alt="landing2"
            className="gps-dog-img"
          />
          <p className="gps-dog-text">
            Enter some brief text here about what the smartdog collar does
          </p>
        </div>
      </Grid>
    </div>
  );
};

export default LandingPage;
