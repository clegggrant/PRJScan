import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';

const styles = {
  page: {
    marginTop: 8
  },
  spacing: {
    marginBottom: 8
  },
  input: {
    display: "none"
  },
  upload: {
    width: "100%"
  },
  uploadContainer: {
    textAlign: "center"
  },
  icon: {
    height: 50,
    width: 50,
    marginTop: 26
  },
  iconText: {
    marginBottom: 30
  }
};

// import { setIsAuthenticated } from "../actions/login_actions";

const mapStateToProps = state => ({
  // getIsAuthenticated: state.loginReducer.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  // setIsAuthenticated: status => dispatch(setIsAuthenticated(status))
});

const fileTest = props => {
  var x = document.getElementById("input");

  if ("files" in x) {
    if (x.files.length === 0) {
      console.log("No files uploaded.")
    } else {
      var file = x.files[0];
      console.log(file);
    }
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <div className={this.props.classes.page}>
        <Grid spacing={8} container>
          <Grid xs={12} item>
            <Typography className={this.props.classes.spacing} variant="display1">Dashboard</Typography>
            <br />
            <Card>
              <CardContent>
                <input className={this.props.classes.input} id="input" type="file" accept="application/pdf" onChange={() => fileTest(this.props)} />
                <label htmlFor="input">
                  <Button className={this.props.classes.upload} component="span" variant="outlined" color="primary" disableTouchRipple>
                    <div className={this.props.classes.uploadContainer}>
                      <InsertDriveFile className={this.props.classes.icon} />
                      <h1 className={this.props.classes.iconText}>Choose PDF</h1>
                    </div>
                  </Button>
                </label>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));