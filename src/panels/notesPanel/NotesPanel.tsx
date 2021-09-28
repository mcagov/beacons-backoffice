import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { INote } from "../../entities/INote";
import { INotesGateway } from "../../gateways/notes/INotesGateway";
import { formatMonth } from "../../utils/dateTime";
import { titleCase } from "../../utils/writingStyle";

interface NotesPanelProps {
  notesGateway: INotesGateway;
  beaconId: string;
}

export const noNotesMessage = "No notes associated with this record";

export const NotesPanel: FunctionComponent<NotesPanelProps> = ({
  notesGateway,
  beaconId,
}: NotesPanelProps): JSX.Element => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect((): void => {
    const fetchNotes = async (beaconId: string) => {
      try {
        const notes = await notesGateway.getNotes(beaconId);
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes(beaconId);
  }, [beaconId, notesGateway]);

  if (notes.length === 0) {
    return (
      <Card>
        <CardContent>
          <CardHeader title={noNotesMessage} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <CardHeader title="MCA / MCC Notes" />
        <NotesTable notes={notes} />
      </CardContent>
    </Card>
  );
};

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
