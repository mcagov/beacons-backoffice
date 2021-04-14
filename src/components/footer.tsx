import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { FunctionComponent } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      top: "auto",
      bottom: 0,
    },
    mcaLogo: {
      height: "100px",
    },
  })
);

const Footer: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img
            src={process.env.PUBLIC_URL + "/mca-logo-dark.png"}
            alt="mca logo"
            className={classes.mcaLogo}
          />
          UK 406MHz Beacon Registry
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
