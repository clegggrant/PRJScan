import React from "react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#00a78f"
    },
    secondary: {
      main: "#00a78f"
    }
  },
  typography: {
    useNextVariants: true
  }
});

function wrapRoot(Component) {
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

export default wrapRoot;
