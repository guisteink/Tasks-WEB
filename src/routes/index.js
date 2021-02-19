import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../views/Home";
import Task from "../views/Task";
import QrCode from "../views/QrCode";
import Login from "../views/Login";
import StoreProvider from "../store/provider";
import RoutesPrivate from "../routes/private";
import Register from "../views/Register";

export default function Routes() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Switch>
          <Route path="/" exact component={Home} /> 
          <Route path="/home" exact component={Home} />
          <Route path="/task" exact component={Task} />
          <Route path="/task/:id" exact component={Task} />
          <Route path="/qrcode" exact component={QrCode} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </StoreProvider>
    </BrowserRouter>
  );
}
