import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import wrapRoot from "../components/shell/wrap-root";
import NavBar from "../components/shell/nav-bar";
import Dashboard from "./dashboard";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <NavBar>
            <Switch>
              <Route component={Dashboard} path="/" exact />
              <Redirect to="/" />
            </Switch>
          </NavBar>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default wrapRoot(App);
