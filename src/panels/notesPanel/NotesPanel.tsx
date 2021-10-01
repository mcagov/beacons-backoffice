import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import { Field, Form, FormikErrors, FormikProps, withFormik } from "formik";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PanelButton } from "../../components/dataPanel/EditPanelButton";
import { ErrorState } from "../../components/dataPanel/PanelErrorState";
import { LoadingState } from "../../components/dataPanel/PanelLoadingState";
import { DataPanelStates } from "../../components/dataPanel/States";
import { INote, NoteType } from "../../entities/INote";
import { INotesGateway } from "../../gateways/notes/INotesGateway";
import { formatMonth } from "../../utils/dateTime";
import { Placeholders, titleCase } from "../../utils/writingStyle";

interface NotesPanelProps {
  notesGateway: INotesGateway;
  beaconId: string;
}

interface FormValues {
  type: string;
  text: string;
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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect((): void => {
    const fetchNotes = async (beaconId: string) => {
      try {
        setLoading(true);
        const notes = await notesGateway.getNotes(beaconId);
        setNotes(notes);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchNotes(beaconId);
  }, [userState, beaconId, notesGateway]);

  const handleSave = async (note: Partial<INote>): Promise<void> => {
    try {
      note.beaconId = beaconId;
      await notesGateway.createNote(note);
      setUserState(DataPanelStates.Viewing);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

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
        return <NotesEditing onSave={handleSave} />;
      default:
        setError(true);
    }
  };

  const NotesEditing: FunctionComponent<{
    onSave: (note: FormValues) => void;
  }> = ({ onSave }): JSX.Element => {
    return (
      <>
        <h2>Add a note</h2>
        <OtherForm onSave={onSave} />
      </>
    );
  };

  const InnerForm = (props: FormikProps<FormValues>) => {
    const { errors, isSubmitting, touched, isValid } = props;

    return (
      <Form>
        <FormControl component="fieldset">
          <FormLabel component="legend">What type of note is this?</FormLabel>
          <RadioGroup aria-label="note type" name="radio-buttons-group">
            <label>
              <Field
                as={Radio}
                type="radio"
                id="type"
                name="type"
                value={NoteType.GENERAL}
                data-testid="general-note-type"
              />
              General note (e.g. owner has contacted the service for advice)
            </label>
            <label>
              <Field
                as={Radio}
                type="radio"
                id="type"
                name="type"
                value={NoteType.INCIDENT}
                data-testid="incident-note-type"
              />
              Incident note (e.g. beacon activation, alarm raised etc.)
            </label>
          </RadioGroup>
        </FormControl>
        <Box mr={75}>
          <Field
            as={TextField}
            id="text"
            name="text"
            type="string"
            label="Please add your notes below"
            multiline
            fullWidth
            helperText="The date and your name will be automatically added"
            rows={4}
            placeholder="Add a note here"
            data-testid="note-input-field"
          />
        </Box>
        <Box mt={2} mr={2}>
          <Button
            name="save"
            type="submit"
            color="secondary"
            data-testid="save"
            variant="contained"
            disabled={
              isSubmitting || !!errors.type || !!errors.text || !isValid
            }
          >
            Save note
          </Button>
          <Button
            name="cancel"
            onClick={() => setUserState(DataPanelStates.Viewing)}
            data-testid="cancel"
          >
            Cancel
          </Button>
        </Box>
      </Form>
    );
  };

  const OtherForm = withFormik<
    { onSave: (note: FormValues) => void },
    FormValues
  >({
    mapPropsToValues: (props) => {
      return {
        type: "",
        text: "",
      };
    },

    isInitialValid: false,

    validate: (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};
      if (!values.type) {
        errors.type = "Required";
      } else if (!values.text) {
        errors.text = "Required";
      }
      return errors;
    },

    handleSubmit: (values: FormValues, { setSubmitting, props }) => {
      props.onSave(values);
      setSubmitting(false);
    },
  })(InnerForm);

  return (
    <Card>
      <CardContent>
        <>
          {error && <ErrorState message={Placeholders.UnspecifiedError} />}
          {loading && <LoadingState />}
          {error || loading || renderState(userState)}
        </>
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
