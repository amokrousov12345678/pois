//import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/spacelab/bootstrap.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementsByTagName('body')[0])
