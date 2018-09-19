import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./private-route";
import Login from "./login";
import Logout from "./logout";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} path="/login" exact />
          <PrivateRoute component={Logout} path="/logout" exact />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;