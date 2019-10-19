import React from "react";
import { useAuth0 } from "./auth0-wrapper";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import { Link } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
<<<<<<< HEAD
import SignupFormContainer from "./containers/SignUpForm.js";
require("dotenv").config();
=======

require('dotenv').config();

>>>>>>> Updated Bootstrap Version,  Removed imports, Changed label and Button.Jsx styling in index.css. Changed auth0 login and logout buttons to React JSX Button Components and changed style.  Changed landingpage and track page to const (functional components) isntead of class.  Added auth0 authentication check to track page.
function App() {
  const { loading } = useAuth0;

    if(loading){
        return(
            <div>Loading...</div>
        )
    }

    return (
        <div className="demo-big-content">
            <Layout fixedHeader>
                <Header className="header-color" title="SMARTDog" scroll>
                    <Navigation>
                        <Link to="/about">About</Link>
                        <Link to="/works">How It Works</Link>
                        <Link to="/track">Track</Link>
                        <Login/>
                    </Navigation>
                </Header>
                <Drawer title="SMARTDog">
                    <Navigation>
                        <Link to="/about">About</Link>
                        <Link to="/works">How It Works</Link>
                        <Link to="/track">Track</Link>
                        <Login/>
                    </Navigation>
                </Drawer>
                <Content>
                    <Main/>
                    {/*{<div className='container'><SignupFormContainer /></div>}*/}
                </Content>
            </Layout>
        </div>         
    );
    
}
export default App;
