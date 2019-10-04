import React, {Component} from 'react';
import {render} from 'react-dom';
import './index.css';
import SignupFormContainer from './containers/SignupFormContainer';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/main';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {Auth0Provider} from "./auth0-wrapper";
import config from "./auth_config.json";
import App from "./App";

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
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
  >
      <BrowserRouter><App /></BrowserRouter>
    </Auth0Provider>,
    document.getElementById("root")
  );

  serviceWorker.unregister();