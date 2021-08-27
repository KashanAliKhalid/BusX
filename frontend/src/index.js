
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from'react-redux'
import store from './store'
import Login from 'layouts/Login'
import Forbidden from "./views/403";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


import AdminLayout from "layouts/Admin.js";

ReactDOM.render(
    <Provider store={store}>

  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/login" render={(props) => <Login {...props} />} />
      <Route path="/403" render={(props) => <Forbidden {...props} />} />
      <Redirect from="/" to="/login"/>
    </Switch>
  </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);
