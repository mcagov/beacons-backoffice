import {
  Button,
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
import { Field, Form, Formik } from "formik";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PanelButton } from "../../components/dataPanel/EditPanelButton";
import { DataPanelStates } from "../../components/dataPanel/States";
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
  const [userState, setUserState] = useState<DataPanelStates>(
    DataPanelStates.Viewing
  );

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

  const renderState = (state: DataPanelStates) => {
    switch (state) {
      case DataPanelStates.Viewing:
        return (
          <>
            <PanelButton onClick={() => setUserState(DataPanelStates.Editing)}>
              Add a new note
            </PanelButton>
            {notes.length === 0 ? (
              <CardHeader title={noNotesMessage} />
            ) : (
              <>
                <CardHeader title="MCA / MCC Notes" />
                <NotesTable notes={notes} />
              </>
            )}
          </>
        );
      case DataPanelStates.Editing:
        return <NotesEditing />;
    }
  };

  const NotesEditing: FunctionComponent = (): JSX.Element => {
    return (
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
                General note (e.g. owner has contacted the service for advice)
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
              as={"textarea"}
              data-testid="note-input-field"
              name="noteInputField"
              type="string"
              placeholder="Add a note here"
            />
            <Button
              onClick={() => setUserState(DataPanelStates.Viewing)}
              data-testid="cancel"
            >
              Cancel
            </Button>
          </Form>
        </Formik>
      </>
    );
  };

  return (
    <Card>
      <CardContent>{renderState(userState)}</CardContent>
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
