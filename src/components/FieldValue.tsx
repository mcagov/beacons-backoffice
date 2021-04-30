import { Typography } from "@material-ui/core";
import { FunctionComponent } from "react";

interface IFieldValueProps {
  children: string | undefined;
}

export const FieldValue: FunctionComponent<IFieldValueProps> = ({ children }) =>
  typeof children === "undefined" ? (
    <Typography>
      <i>NO DATA ENTERED</i>
    </Typography>
  ) : (
    <Typography>
      <i>{children}</i>
    </Typography>
  );
