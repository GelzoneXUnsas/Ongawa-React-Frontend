// import React from 'react'
// import ReactDOM from 'react-dom'
// import './global.css'
// import Homepage from './pages/HomePage'

// ReactDOM.render(<Homepage/>, document.getElementById('root'))

import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import "./index.css";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify';
import { record } from 'aws-amplify/analytics';
import outputs from '../amplify_outputs.json';

Amplify.configure({
  ...Amplify.getConfig(),
  Analytics: amplifyconfig.Analytics,
});
>>>>>>> f73e4d7350be570c43c47f92a65ea5afe3712908

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
