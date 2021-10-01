import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { INote } from "entities/INote";
import React, { FunctionComponent } from "react";
import { formatMonth } from "utils/dateTime";
import { titleCase } from "utils/writingStyle";

interface INotesTableProps {
  notes: INote[];
}

const NotesTable: FunctionComponent<INotesTableProps> = ({
  notes,
}: INotesTableProps): JSX.Element => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type of note</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Noted by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>{formatMonth(note.createdDate)}</TableCell>
              <TableCell>{titleCase(note.type)}</TableCell>
              <TableCell>{note.text}</TableCell>
              <TableCell>{note.fullName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NotesTable;
