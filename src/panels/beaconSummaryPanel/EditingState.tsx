import { Typography } from "@material-ui/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { FunctionComponent } from "react";
import { IBeacon } from "../../entities/IBeacon";
import {
  beaconOwnerDidNotDisclose,
  Placeholders,
  WritingStyle,
} from "../../useCases/mcaWritingStyleFormatter";

export const EditingState: FunctionComponent<{
  beacon: IBeacon;
  onSave: () => void;
  onCancel: () => void;
}> = ({ beacon, onSave, onCancel }) => {
  interface Values {
    manufacturer: string;
    model: string;
    type: string;
    protocolCode: string;
    manufacturerSerialNumber: string;
    chkCode: string;
    batteryExpiryDate: string;
    lastServicedDate: string;
  }

  return (
    <Formik
      initialValues={{
        manufacturer: beacon.manufacturer,
        model: beacon.model,
        type: beacon.type,
        protocolCode: beacon.protocolCode || "",
        manufacturerSerialNumber: beacon.manufacturerSerialNumber,
        chkCode: beacon.chkCode,
        batteryExpiryDate: beacon.batteryExpiryDate.slice(0, 10),
        lastServicedDate: beacon.lastServicedDate.slice(0, 10),
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

          <label htmlFor="protocolCode">
            <Typography>
              {"Protocol code" + WritingStyle.KeyValueSeparator}
            </Typography>
          </label>
          <Field id="protocolCode" name="protocolCode" type="string" />

          <label htmlFor="manufacturerSerialNumber">
            <Typography>
              {"Manufacturer serial number" + WritingStyle.KeyValueSeparator}
            </Typography>
          </label>
          <Field
            id="manufacturerSerialNumber"
            name="manufacturerSerialNumber"
            type="string"
          />

          <label htmlFor="chkCode">
            <Typography>
              {"CHK code" + WritingStyle.KeyValueSeparator}
            </Typography>
          </label>
          <Field
            id="chkCode"
            name="chkCode"
            type="string"
            placeholder={
              // TODO: Use this universally on all IBeacon fields (and make them optional) to cater for ETL data?
              beaconOwnerDidNotDisclose(props.values.chkCode)
                ? Placeholders.NoData
                : ""
            }
          />

          <label htmlFor="batteryExpiryDate">
            <Typography>
              {"Battery expiry date" + WritingStyle.KeyValueSeparator}
            </Typography>
          </label>
          <Field id="batteryExpiryDate" name="batteryExpiryDate" type="date" />

          <label htmlFor="lastServicedDate">
            <Typography>
              {"Last serviced date" + WritingStyle.KeyValueSeparator}
            </Typography>
          </label>
          <Field id="lastServicedDate" name="lastServicedDate" type="date" />
        </Form>
      )}
    </Formik>
  );
};
