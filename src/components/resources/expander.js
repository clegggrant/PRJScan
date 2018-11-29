import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class Expander extends React.Component {
  componentDidMount() {
    axios.post("http://localhost:3001/process", {
      params: {
        original: this.props.text
      }
    }).then(res => {
      let a = JSON.parse(res.data)

      this.setState({ img1: a["img1"] });
      this.setState({ img2: a["img2"] });
      this.setState({ fil1: a["fil1"] });
      this.setState({ fil2: a["fil2"] });
      this.setState({ orig: a["orig"] });

      let keys = Object.keys(this.state.fil1);
      let obj = this.state.fil1;
      keys.sort(function(a, b) { return obj[a] - obj[b] });
      this.setState({ keys: keys.reverse() });
    }).catch(err => {
      alert(err);
    });
  }

  render() {
    const { classes } = this.props;

    return (
      this.state && this.state.img1 && this.state.img2 && this.state.fil1 && this.state.fil2 && this.state.keys && this.state.orig ? 
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Original Text</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {this.state.orig}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Analyzed Text</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {
                this.state.keys.map(function (item, i) {
                  return <li key={i}>{item}</li>
                })
              }
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Model Correction</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container>
              <Grid item xs={12}>
                <img src={`data:image/png;base64,${this.state.img1}`} alt="" style={{width: "100%"}} />
              </Grid>
              <Grid item xs={12}>
                <img src={`data:image/png;base64,${this.state.img2}`} alt="" style={{width: "100%"}} />
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div> :
      <LinearProgress color="secondary" />
    );
  }
}

Expander.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Expander);
