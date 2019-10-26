import React from "react";
import { useAuth0 } from "./auth0-wrapper";
import NavigationBar from "./components/NavigationBar";

function App() {
  const { loading } = useAuth0;

  if (loading) {
    return <div>Loading...</div>;
  }

  return <NavigationBar />;
}
export default App;
