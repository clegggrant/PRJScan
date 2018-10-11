import React from "react";
import { connect } from "react-redux";

import pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/lib/pdf.worker";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

import { setPlaintext } from "../actions/dashboard_actions";

const styles = {
  page: {
    marginTop: 8,
    wordBreak: "break-word"
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

const mapStateToProps = state => ({
  getPlaintext: state.dashboardReducer.plaintext
});

const mapDispatchToProps = dispatch => ({
  setPlaintext: status => dispatch(setPlaintext(status))
});

const convert = props => {
  var x = document.getElementById("input");
  if ("files" in x) {
    if (x.files.length !== 0) {
      var reader = new FileReader();
      reader.readAsDataURL(x.files[0]);
      reader.onload = function() { parse(props, this.result); };
    }
  }
}

function parse(props, fileReader) {
  var pdfAsDataUri = fileReader;
  var pdfAsArray = convertDataUriToBinary(pdfAsDataUri);

  var PDFJS = require("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
  var pdf = PDFJS.getDocument(pdfAsArray);

  function getText(pdf) {
     // Get all pages text
    return pdf.then(function (pdf) {
      var maxPages = pdf.pdfInfo.numPages;
      var countPromises = []; // Collecting all page promises

      for (var j = 1; j <= maxPages; j++) {
        var page = pdf.getPage(j);

        // Add page promise
        countPromises.push(page.then(function (page) {
          var textContent = page.getTextContent();
          // Return content promise
          return textContent.then(function (text) {
            // Value page text
            return text.items.map(function (s) { return s.str; }).join("");
          });
        }));
      }

      // Wait for all pages and join text
      return Promise.all(countPromises).then(function (texts) {
        return texts.join("");
      });
    });
  }

  getText(pdf).then(function (text) {
    props.setPlaintext(text);
  }, function (error) {
    console.error(error);
  });
}

function convertDataUriToBinary(dataUri) {
  dataUri = dataUri + "";

  var base64Marker = ";base64,";
  var base64Index = dataUri.indexOf(base64Marker) + base64Marker.length;

  var base64 = dataUri.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return array;
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
                <input className={this.props.classes.input} id="input" type="file" accept="application/pdf" onChange={() => convert(this.props)} />
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
          <Grid xs={12} item>
            <Card>
              <CardContent>
                <Typography component="p">
                  {this.props.getPlaintext}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));