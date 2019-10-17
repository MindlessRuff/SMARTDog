import React from "react";
import {useAuth0} from "./auth0-wrapper";
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import Main from './components/main';
import Login from "./components/login";

function App() {
    const {loading} = useAuth0;

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
                        <Login className="login-button"/>
                    </Navigation>
                </Header>
                <Drawer title="SMARTDog">
                    <Navigation>
                        <Link to="/about">About</Link>
                        <Link to="/works">How It Works</Link>
                        <Login className="login-button"/>
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