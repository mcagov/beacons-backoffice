import {
  Card,
  CardContent,
  CardHeader,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PanelButton } from "../../components/dataPanel/EditPanelButton";
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
  const [addNewNote, setAddNewNote] = useState(false);

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
          {addNewNote ? (
            <>
              <h1>Add a note</h1>
              <Formik
                initialValues={{
                  noteType: "",
                  noteInputField: "",
                }}
                onSubmit={() => {}}
              >
                <Form>
                  <div id="my-radio-group">Note Type</div>
                  <div role="group">
                    <label>
                      <Field
                        type="radio"
                        name="noteType"
                        value="General"
                        data-testid="general-note-type"
                      />
                      General note (e.g. owner has contacted the service for
                      advice)
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="noteType"
                        value="Incident"
                        data-testid="incident-note-type"
                      />
                      Incident note (e.g. beacon activation, alarm raised etc.)
                    </label>
                  </div>
                  <Field
                    as={Input}
                    data-testid="note-input-field"
                    name="noteInputField"
                    type="string"
                    placeholder="Add a note here"
                  />
                </Form>
              </Formik>
            </>
          ) : (
            <PanelButton onClick={() => setAddNewNote(true)}>
              Add a new note
            </PanelButton>
          )}
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
