import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { WritingStyle } from "../../useCases/mcaWritingStyleFormatter";
import { FieldValue } from "./FieldValue";

type IFieldValue = string | undefined;

export interface IField {
  key: string;
  value: IFieldValue | IFieldValue[];
}

interface IPanelViewStateProps {
  fields: IField[];
  columns?: 1 | 2;
  splitAfter?: number;
}

export const PanelViewState: FunctionComponent<IPanelViewStateProps> = ({
  fields,
  columns = 1,
  splitAfter = Math.ceil(fields.length / 2),
}) => {
  columns = splitAfter ? 2 : columns;
  switch (columns) {
    case 1:
      return <OneColumn fields={fields} />;
    case 2:
      return <TwoColumns fields={fields} splitAfter={splitAfter} />;
    default:
      throw Error("Unsupported number of columns, max 2");
  }
};

const OneColumn: FunctionComponent<IPanelViewStateProps> = ({ fields }) => (
  <TableContainer>
    <Table size="small">
      <TableBody>
        {fields.map((field, index) => {
          const valuesAsArray =
            field.value instanceof Array ? field.value : [field.value];
          return (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <Typography>
                  {field.key + WritingStyle.KeyValueSeparator}
                </Typography>
              </TableCell>
              <TableCell>
                {valuesAsArray.map((value, index) => (
                  <FieldValue key={index}>{value}</FieldValue>
                ))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

const TwoColumns: FunctionComponent<IPanelViewStateProps> = ({
  fields,
  splitAfter,
}) => {
  const columnOneFields = fields.slice(0, splitAfter);
  const columnTwoFields = fields.slice(splitAfter);

  return (
    <Grid container>
      <Grid item xs={6}>
        <OneColumn fields={columnOneFields} />
      </Grid>
      <Grid item xs={6}>
        <OneColumn fields={columnTwoFields} />
      </Grid>
    </Grid>
  );
};
