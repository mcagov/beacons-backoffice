import { TableRow } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { TableCellWithoutLines } from "./PanelViewingState";

export const TabulatedRow: FunctionComponent<{
  displayKey: JSX.Element;
  value: JSX.Element;
}> = ({ displayKey, value }) => (
  <TableRow>
    <TableCellWithoutLines component="th" scope="row">
      {displayKey}
    </TableCellWithoutLines>
    <TableCellWithoutLines>{value}</TableCellWithoutLines>
  </TableRow>
);
