import { Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import { formatFieldValue } from "../../useCases/mcaWritingStyleFormatter";

interface IFieldValueProps {
  children: string | undefined;
}

export const FieldValue: FunctionComponent<IFieldValueProps> = ({
  children,
}) => <Typography>{formatFieldValue(children)}</Typography>;
