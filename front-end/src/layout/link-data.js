import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";

import { setDrawerOpen } from "../actions/persist-drawer_actions"

const styles = {
  menuItem: {
    paddingLeft: 24,
    paddingRight: 24
  }
};

const mapStateToProps = state => ({
  open: state.persistDrawerReducer.open
});

const mapDispatchToProps = dispatch => ({
  setDrawerOpen: val => dispatch(setDrawerOpen(val))
});

class LinkData extends React.Component {
  handleDrawerToggle() {
    this.props.setDrawerOpen(!this.props.open);
  };

  render() {
    return (
      <div>
        <MenuItem
          component={Link}
          to="/dashboard"
          selected={window.location.pathname === "/dashboard"}
          onClick={() => this.handleDrawerToggle()}
          style={styles.menuItem}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkData);