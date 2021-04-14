import {
  createMuiTheme,
  MuiThemeProvider,
  Theme,
} from "@material-ui/core/styles";
import "fontsource-roboto";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
      light: "484848",
      dark: "#000000",
    },
    secondary: {
      main: "#757575",
      light: "#a4a4a4",
      dark: "#494949",
    },
    background: {
      default: "#eeeeee",
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();
