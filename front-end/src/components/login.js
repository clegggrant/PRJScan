import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { setIsAuthenticated } from "../actions/login_actions";

const mapStateToProps = state => ({
  getIsAuthenticated: state.loginReducer.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  setIsAuthenticated: status => dispatch(setIsAuthenticated(status))
});

class Login extends React.Component {
  login = () => this.props.setIsAuthenticated(true);

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/logout" } };

    if (this.props.getIsAuthenticated) return <Redirect to={from} />;

    return (
      <button onClick={this.login}>login</button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);