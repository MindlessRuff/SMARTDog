import React from "react";
import { useAuth0 } from "./auth0-wrapper";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import { Link } from "react-router-dom";
import Main from "./main";
import Login from "./components/Login_Out";

function App() {
<<<<<<< HEAD
  const { loading } = useAuth0;
=======
    const { loading } = useAuth0;
>>>>>>> eeefd11e6329b1fb38ea7fabdbb651b70c6c9356

  if (loading) {
    return <div>Loading...</div>;
  }

<<<<<<< HEAD
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
            <Link to="/about">About</Link>
            <Link to="/works">How It Works</Link>
            <Link to="/track">Track</Link>
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
            <Link to="/about">About</Link>
            <Link to="/works">How It Works</Link>
            <Link to="/track">Track</Link>
            <Login />
          </Navigation>
        </Drawer>
        <Content>
          <Main />
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
                        <Link to ="/profile">Profile</Link>
                        <Login/>
                    </Navigation>
                </Header>
                <Drawer title = {<Link to={'/'} style={{color: 'lightslategray'}}>SMARTDog</Link>}>
                    <Navigation>
                        <Link to="/about">About</Link>
                        <Link to="/works">How It Works</Link>
                        <Link to="/track">Track</Link>
                        <Link to ="/profile">Profile</Link>
                        <Login/>
                    </Navigation>
                </Drawer>
                <Content>
                    <Main/>
                </Content>
            </Layout>
        </div>         
    );
    
>>>>>>> eeefd11e6329b1fb38ea7fabdbb651b70c6c9356
}
export default App;
