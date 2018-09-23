import React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3d70b2"
    },
    secondary: {
      main: "#41d6c3"
    }
  }
});

function withRoot(Component) {
  function wrapWithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return wrapWithRoot;
}

export default withRoot;