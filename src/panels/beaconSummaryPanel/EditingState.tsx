import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import React, { FunctionComponent } from "react";
import {
  PanelViewingState,
  TableCellWithoutLines,
} from "../../components/dataPanel/PanelViewingState";
import { IBeacon } from "../../entities/IBeacon";
import {
  beaconOwnerDidNotDisclose,
  formatEmergencyContacts,
  formatOwners,
  formatUses,
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
    <Grid container direction="row" justify="space-around" alignItems="stretch">
      <Grid item xs={6}>
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
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => (
            <Form>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TabulatedRow
                      displayKey={
                        <label htmlFor="manufacturer">
                          <Typography>
                            {"Manufacturer" + WritingStyle.KeyValueSeparator}
                          </Typography>
                        </label>
                      }
                      value={
                        <TextField
                          size="small"
                          id="manufacturer"
                          name="manufacturer"
                          type="string"
                          value={props.values.manufacturer}
                        />
                      }
                    />
                    <TabulatedRow
                      displayKey={
                        <label htmlFor="model">
                          <Typography>
                            {"Model" + WritingStyle.KeyValueSeparator}
                          </Typography>
                        </label>
                      }
                      value={
                        <TextField
                          value={props.values.model}
                          id="model"
                          name="model"
                          type="string"
                        />
                      }
                    />

                    <TabulatedRow
                      displayKey={
                        <label htmlFor="type">
                          <Typography>
                            {"Type" + WritingStyle.KeyValueSeparator}
                          </Typography>
                        </label>
                      }
                      value={
                        <TextField
                          value={props.values.type}
                          id="type"
                          name="type"
                          type="string"
                        />
                      }
                    />

                    <TabulatedRow
                      displayKey={
                        <label htmlFor="protocolCode">
                          <Typography>
                            {"Protocol code" + WritingStyle.KeyValueSeparator}
                          </Typography>
                        </label>
                      }
                      value={
                        <TextField
                          value={props.values.protocolCode}
                          id="protocolCode"
                          name="protocolCode"
                          type="string"
                        />
                      }
                    />

                    <TabulatedRow
                      displayKey={
                        <label htmlFor="manufacturerSerialNumber">
                          <Typography>
                            {"Manufacturer serial number" +
                              WritingStyle.KeyValueSeparator}
                          </Typography>
                        </label>
                      }
                      value={
                        <TextField
                          value={props.values.manufacturerSerialNumber}
                          id="manufacturerSerialNumber"
                          name="manufacturerSerialNumber"
                          type="string"
                        />
                      }
                    />

                    <TabulatedRow
                      displayKey={
                        <label htmlFor="chkCode">
                          <Typography>
                            {"CHK code" + WritingStyle.KeyValueSeparator}
                          </Typography>
                        </label>
                      }
                      value={
                        <TextField
                          value={props.values.chkCode}
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
                      }
                    />

                    <TabulatedRow
                      displayKey={
                        <label htmlFor="batteryExpiryDate">
                          <Typography>
                            {"Battery expiry date" +
                              WritingStyle.KeyValueSeparator}
                          </Typography>
                        </label>
                      }
                      value={
                        <TextField
                          value={props.values.batteryExpiryDate}
                          id="batteryExpiryDate"
                          name="batteryExpiryDate"
                          type="date"
                        />
                      }
                    />

                    <TabulatedRow
                      displayKey={
                        <label htmlFor="lastServicedDate">
                          <Typography>
                            {"Last serviced date" +
                              WritingStyle.KeyValueSeparator}
                          </Typography>
                        </label>
                      }
                      value={
                        <TextField
                          value={props.values.lastServicedDate}
                          id="lastServicedDate"
                          name="lastServicedDate"
                          type="date"
                        />
                      }
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            </Form>
          )}
        </Formik>
      </Grid>
      <Grid item xs={6}>
        <PanelViewingState
          columns={1}
          fields={[
            {
              key: "Owner(s)",
              value: formatOwners(beacon.owners),
            },
            {
              key: "Emergency contacts",
              value: formatEmergencyContacts(beacon.emergencyContacts),
            },
            {
              key: "Registered uses",
              value: formatUses(beacon.uses),
            },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <Button color="secondary" variant="contained" disableElevation>
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Grid>
    </Grid>
  );
};

const TabulatedRow: FunctionComponent<{
  displayKey: JSX.Element;
  value: JSX.Element;
}> = ({ displayKey, value }) => (
  <TableRow>
    <TableCellWithoutLines component="th" scope="row">
      {displayKey}
    </TableCellWithoutLines>
    <TableCellWithoutLines>{value}</TableCellWithoutLines>
  </TableRow>
);
