import React from "react";

import pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/lib/pdf.worker";

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
        reader.onload = function () { scope.parse(this.result) };
      }
    }
  }

  parse(fileReader) {
    let pdfAsDataUri = fileReader;
    let pdfAsArray = this.convertDataUriToBinary(pdfAsDataUri);

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
    let pdf = pdfjsLib.getDocument(pdfAsArray);

    function getText(pdf) {
      // Get all pages text
     return pdf.then(function (pdf) {
       let maxPages = pdf.numPages;
       let countPromises = []; // Collecting all page promises
 
       for (let j = 1; j <= maxPages; j++) {
         let page = pdf.getPage(j);
 
         // Add page promise
         countPromises.push(page.then(function (page) {
           let textContent = page.getTextContent();
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
 
   getText(pdf).then(doWork.bind(null, this), function (error) {
     console.error(error);
   });

    function doWork(ths, data) {
      ths.setState({ text: data })
    }
  }

  convertDataUriToBinary(dataUri) {
    dataUri = dataUri + "";
  
    let base64Marker = ";base64,";
    let base64Index = dataUri.indexOf(base64Marker) + base64Marker.length;
  
    let base64 = dataUri.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let array = new Uint8Array(new ArrayBuffer(rawLength));
  
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
  
    return array;
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
