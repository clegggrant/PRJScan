import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

import Expander from "../components/resources/expander";

const styles = {
  page: {
    wordBreak: "break-word"
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

class Dashboard extends React.Component {
  state = {
    text: null
  }

  convert() {
    const scope = this;

    let x = document.getElementById("input");
    if ("files" in x) {
      if (x.files.length !== 0) {
        let reader = new FileReader();
        reader.readAsDataURL(x.files[0]);
        reader.onload = function (e) {
          scope.setState({ text: e.target.result });
        }
      }
    }
  }

  render() {
    return (
      <div className={this.props.classes.page}>
        <Grid spacing={16} container>
          {
            this.state.text == null ?
            <Grid xs={12} item>
              <Card>
                <CardContent>
                  <input className={this.props.classes.input} id="input" type="file" accept="application/pdf" onChange={() => this.convert()} />
                  <label htmlFor="input">
                    <Button className={this.props.classes.upload} component="span" variant="outlined" disableTouchRipple>
                      <div className={this.props.classes.uploadContainer}>
                        <InsertDriveFile className={this.props.classes.icon} />
                        <h1 className={this.props.classes.iconText}>Choose PDF</h1>
                      </div>
                    </Button>
                  </label>
                </CardContent>
              </Card>
            </Grid> :
            <Grid xs={12} item>
              <Expander text={this.state.text} />
            </Grid>
          }
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
