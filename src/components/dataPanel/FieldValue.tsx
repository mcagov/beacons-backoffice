import { Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import { Style } from "../../useCases/mcaWritingStyleFormatter";

interface IFieldValueProps {
  children: string | undefined;
}

export const FieldValue: FunctionComponent<IFieldValueProps> = ({ children }) =>
  typeof children === "undefined" ? (
    <Typography>
      <i>{Style.NoData}</i>
    </Typography>
  ) : (
    <Typography>
      <b>{children.toLocaleUpperCase()}</b>
    </Typography>
  );
