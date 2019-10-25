import React from "react";
<<<<<<< HEAD
import { useAuth0 } from "./auth0-wrapper";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import { Link } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
//import SignupFormContainer from "./containers/SignUpForm.js";
require("dotenv").config();

require("dotenv").config();
=======
import {useAuth0} from "./auth0-wrapper";
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import Main from './main';
import Login from "./components/Login_Out";
>>>>>>> b39242b3f668f0a01bc7323638c0afe17f29aaec

function App() {
  const { loading } = useAuth0;

  if (loading) {
    return <div>Loading...</div>;
  }

<<<<<<< HEAD
  return (
    <div className="demo-big-content">
      <Layout fixedHeader>
        <Header className="header-color" title="SMARTDog" scroll>
          <Navigation>
            <Link to="/about">About</Link>
            <Link to="/works">How It Works</Link>
            <Link to="/track">Track</Link>
            <Login />
          </Navigation>
        </Header>
        <Drawer title="SMARTDog">
          <Navigation>
            <Link to="/about">About</Link>
            <Link to="/works">How It Works</Link>
            <Link to="/track">Track</Link>
            <Login />
          </Navigation>
        </Drawer>
        <Content>
          <Main />
          {/*{<div className='container'><SignupFormContainer /></div>}*/}
        </Content>
      </Layout>
    </div>
  );
=======
    return (
        <div className="demo-big-content">
            <Layout fixedHeader>
                <Header className="header-color" title={<Link to={'/'} style={{color: 'white'}}>SMARTDog</Link>} scroll>
                    <Navigation>
                        <Link to="/about">About</Link>
                        <Link to="/works">How It Works</Link>
                        <Link to="/track">Track</Link>
                        <Login/>
                    </Navigation>
                </Header>
                <Drawer title = {<Link to={'/'} style={{color: 'lightslategray'}}>SMARTDog</Link>}>
                    <Navigation>
                        <Link to="/about">About</Link>
                        <Link to="/works">How It Works</Link>
                        <Link to="/track">Track</Link>
                        <Login/>
                    </Navigation>
                </Drawer>
                <Content>
                    <Main/>
                </Content>
            </Layout>
        </div>         
    );
    
>>>>>>> b39242b3f668f0a01bc7323638c0afe17f29aaec
}
export default App;
