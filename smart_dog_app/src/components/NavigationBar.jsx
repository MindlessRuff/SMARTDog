import React from "react";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import { Link } from "react-router-dom";
import Main from "../main";
import Login from "./Login_Out";

const NavigationBar = function(props) {
  return (
    <div className="demo-big-content">
      <Layout fixedHeader>
        <Header
          className="header-color"
          title={
            <Link to={"/"} style={{ color: "white" }}>
              SMARTDog
            </Link>
          }
          scroll
        >
          <Navigation>
            {/* <Link to="/about/">About</Link> */}
            <Link to="/works/">How It Works</Link>
            <Link to="/track/">Track</Link>
            <Link to="/profile/">Profile</Link>
            <Login />
          </Navigation>
        </Header>
        <Drawer
          title={
            <Link to={"/"} style={{ color: "lightslategray" }}>
              SMARTDog
            </Link>
          }
        >
          <Navigation>
            {/* <Link to="/about/">About</Link> */}
            <Link to="/works/">How It Works</Link>
            <Link to="/track/">Track</Link>
            <Link to="/profile/">Profile</Link>
            <Login />
          </Navigation>
        </Drawer>
        <Content>
          <Main />
        </Content>
      </Layout>
    </div>
  );
};

export default NavigationBar;
