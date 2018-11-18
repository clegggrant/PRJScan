import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";

const dashboard = "/dashboard";

class LinkData extends React.Component {
  render() {
    return (
      <Fragment>
        <MenuItem
          component={Link}
          to={dashboard}
          selected={window.location.pathname === dashboard}
          onClick={this.props.toggleDrawer}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </MenuItem>
      </Fragment>
    );
  }
}

export default LinkData;
