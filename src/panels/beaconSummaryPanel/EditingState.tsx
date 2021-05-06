import { Typography } from "@material-ui/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { FunctionComponent } from "react";
import { IBeacon } from "../../entities/IBeacon";
import { WritingStyle } from "../../useCases/mcaWritingStyleFormatter";

export const EditingState: FunctionComponent<{
  beacon: IBeacon;
  onSave: () => void;
  onCancel: () => void;
}> = ({ beacon, onSave, onCancel }) => {
  interface Values {
    manufacturer: string;
    model: string;
    type: string;
  }

  return (
    <Formik
      initialValues={{
        manufacturer: "Ocean Signal",
        model: "Excelsior",
        type: "EPIRB",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => (
        <Form>
          <label htmlFor="manufacturer">
            <Typography>
              {"Manufacturer" + WritingStyle.KeyValueSeparator}
            </Typography>
          </label>
          <Field id="manufacturer" name="manufacturer" type="string" />
          <label htmlFor="model">
            <Typography>{"Model" + WritingStyle.KeyValueSeparator}</Typography>
          </label>
          <Field id="model" name="model" type="string" />
          <label htmlFor="type">
            <Typography>{"Type" + WritingStyle.KeyValueSeparator}</Typography>
          </label>
          <Field id="type" name="type" type="string" />
        </Form>
      )}
    </Formik>
  );
};
