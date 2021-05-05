import { Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";

export const EditPanelButton: FunctionComponent<{ onClick: () => void }> = ({
  onClick,
}): JSX.Element => (
  <Typography align="right" style={{ paddingRight: "5em" }}>
    <button onClick={onClick}>Edit summary</button>
  </Typography>
);
