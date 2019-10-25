import React from "react";
import {useAuth0} from "./auth0-wrapper";
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import Main from './main';
import Login from "./components/Login_Out";

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
                <Header className="header-color" title={<Link to={'/'} style={{color: 'white'}}>SMARTDog</Link>} scroll>
                    <Navigation>
                        <Link to="/about">About</Link>
                        <Link to="/works">How It Works</Link>
                        <Link to="/track">Track</Link>
                        <Link to="/profile">Profile</Link>
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
    
}
export default App;