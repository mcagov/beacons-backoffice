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

interface IField {
  key: string;
  value: string | undefined;
}

interface ViewPanelProps {
  fields: IField[];
  columns?: 1 | 2;
  splitAfter?: number;
}

export const ViewPanel: FunctionComponent<ViewPanelProps> = ({
  fields,
  columns = 1,
  splitAfter = Math.ceil(fields.length / 2),
}) => {
  switch (columns) {
    case 1:
      return <OneColumn fields={fields} />;
    case 2:
      return <TwoColumns fields={fields} splitAfter={splitAfter} />;
    default:
      throw Error("Unsupported number of columns, max 2");
  }
};

const OneColumn: FunctionComponent<ViewPanelProps> = ({ fields }) => (
  <TableContainer>
    <Table size="small">
      <TableBody>
        {fields.map((field, index) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              <Typography>
                {field.key + WritingStyle.KeyValueSeparator}
              </Typography>
            </TableCell>
            <TableCell>
              <FieldValue>{field.value}</FieldValue>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const TwoColumns: FunctionComponent<ViewPanelProps> = ({
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
