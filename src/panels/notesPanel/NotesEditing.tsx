import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { DataPanelStates } from "components/dataPanel/States";
import { NoteType } from "entities/INote";
import { Field, Form, FormikProps } from "formik";
import React, { useState } from "react";

interface FormValues {
  type: string;
  text: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const [userState, setUserState] = useState<DataPanelStates>(
    DataPanelStates.Viewing
  );
  const { errors, isSubmitting, isValid } = props;

  return (
    <Form>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          What type of note is this? (Required)
        </FormLabel>
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
          label="Please add your notes below (Required)"
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
          disabled={isSubmitting || !!errors.type || !!errors.text || !isValid}
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

export default InnerForm;
