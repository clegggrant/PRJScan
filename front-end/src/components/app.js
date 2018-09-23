import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import withRoot from "../layout/with-root";
import PersistDrawer from "../layout/persist-drawer";
import Dashboard from "./dashboard";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PersistDrawer>
            <Route component={Dashboard} path="/dashboard" exact />
          </PersistDrawer>
          <Redirect to="/dashboard" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default withRoot(App);