import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import MenuList from "@material-ui/core/MenuList";
import MenuIcon from "@material-ui/icons/Menu";

import LinkData from "../internals/link-data";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    width: "100%"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "fixed"
    }
  },
  toolbar: { 
    ...theme.mixins.toolbar
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class NavBar extends React.Component {
  state = {
    drawerOpen: false
  }

  handleDrawerToggle() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    const { classes, children } = this.props;
    const { drawerOpen } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              onClick={() => this.handleDrawerToggle()}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              <b>PRJSCAN</b>
            </Typography>
          </Toolbar>
        </AppBar>

        <Hidden>
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            open={drawerOpen}
            onClose={() => this.handleDrawerToggle()}
            variant="temporary"
            ModalProps={{ keepMounted: true }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <MenuList><LinkData toggleDrawer={() => this.handleDrawerToggle()} /></MenuList>
          </Drawer>
        </Hidden>

        <main className={classes.content}><div>{children}</div></main>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
