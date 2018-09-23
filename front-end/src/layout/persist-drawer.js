import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import MenuList from "@material-ui/core/MenuList";

import { setDrawerOpen  } from "../actions/persist-drawer_actions"
import LinkData from "./link-data";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    overflow: "hidden",
    position: "relative",
    width: "100%",
    zIndex: 1
  },
  appBar: {
    position: "fixed",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
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
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  comp: {
    [theme.breakpoints.up("md")]: {
      marginLeft: drawerWidth
    }
  }
});

const mapStateToProps = state => ({
  open: state.persistDrawerReducer.open
});

const mapDispatchToProps = dispatch => ({
  setDrawerOpen: val => dispatch(setDrawerOpen(val))
});

class PersistDrawer extends React.Component {
  handleDrawerToggle() {
    this.props.setDrawerOpen(!this.props.open);
  };

  render() {
    const { classes, theme, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.navIconHide}
              onClick={() => this.handleDrawerToggle()}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              <b>PRJSCAN</b>
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.props.open}
            onClose={() => this.handleDrawerToggle()}
            variant="temporary"
            ModalProps={{
              keepMounted: true
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <MenuList><LinkData /></MenuList>
          </Drawer>
        </Hidden>
        <Hidden implementation="css" smDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar} />
            <Divider />
            <MenuList><LinkData /></MenuList>
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.comp}>{children}</div>
        </main>
      </div>
    );
  }
}

PersistDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PersistDrawer));