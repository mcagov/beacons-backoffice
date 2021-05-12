import { Button, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";

export const EditPanelButton: FunctionComponent<{
  onClick: () => void;
}> = ({ onClick, children }): JSX.Element => (
  <Typography align="right" style={{ paddingRight: "5em" }}>
    <Button variant="outlined" onClick={onClick}>
      {children}
    </Button>
  </Typography>
);
