import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import "react-mdl/extra/material.css";
import "react-mdl/extra/material.js";
// import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./auth0-wrapper";
import App from "./App";
// import "font-awesome/css/font-awesome.min.css";

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    client_id={process.env.REACT_APP_CLIENTID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);

//serviceWorker.unregister();
