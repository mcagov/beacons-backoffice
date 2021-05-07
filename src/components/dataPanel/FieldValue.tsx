import { Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import { formatFieldValue } from "../../useCases/mcaWritingStyleFormatter";

interface IFieldValueProps {
  children: string | undefined;
  valueType?: FieldValueTypes;
}

export enum FieldValueTypes {
  DATE = "DATE",
}

export const FieldValue: FunctionComponent<IFieldValueProps> = ({
  children,
  valueType,
}) => <Typography>{formatFieldValue(children, valueType)}</Typography>;
