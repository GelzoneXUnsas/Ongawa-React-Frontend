// import React from 'react'
// import ReactDOM from 'react-dom'
// import './global.css'
// import Homepage from './pages/HomePage'

// ReactDOM.render(<Homepage/>, document.getElementById('root'))

import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import './index.css';
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Amplify } from 'aws-amplify';
import { record } from 'aws-amplify/analytics';
import outputs from '../amplify_outputs.json';

Amplify.configure({
  ...Amplify.getConfig(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </React.StrictMode>

);