import React from "react";
import { connect } from "react-redux";

import { setIsAuthenticated } from "../actions/login_actions";

const mapDispatchToProps = dispatch => ({
  setIsAuthenticated: status => dispatch(setIsAuthenticated(status))
});

class Logout extends React.Component {
  logout = () => this.props.setIsAuthenticated(false);

  render() {
    return (
      <button onClick={this.logout}>logout</button>
    );
  }
}

export default connect(null, mapDispatchToProps)(Logout);