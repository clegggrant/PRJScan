import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const mapStateToProps = state => ({
  isAuthenticated: state.loginReducer.isAuthenticated
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated
      ? <Component {...props} />
      : <Redirect to={{pathname: "/login", state: { from: props.location }}} />
    }
  />
);

export default connect(mapStateToProps)(PrivateRoute);