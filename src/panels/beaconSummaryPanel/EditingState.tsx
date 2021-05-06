import {
  Button,
  Divider,
  Grid,
  Input,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, FormikHelpers } from "formik";
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
  onSave: (beacon: IBeacon) => void;
  onCancel: () => void;
}> = ({ beacon, onSave, onCancel }) => {
  return (
    <Formik
      initialValues={{
        ...beacon,
        batteryExpiryDate: yyyyMmDdFormat(beacon.batteryExpiryDate),
        lastServicedDate: yyyyMmDdFormat(beacon.lastServicedDate),
      }}
      onSubmit={(
        values: IBeacon,
        { setSubmitting }: FormikHelpers<IBeacon>
      ) => {
        onSave({
          ...values,
          batteryExpiryDate: shortISOFormat(values.batteryExpiryDate),
          lastServicedDate: shortISOFormat(values.lastServicedDate),
        });
        setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="stretch"
          >
            <Grid item xs={6}>
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
                        <Field
                          as={Input}
                          id="manufacturer"
                          name="manufacturer"
                          type="string"
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
                        <Field
                          as={Input}
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
                        <Field as={Input} id="type" name="type" type="string" />
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
                        <Field
                          as={Input}
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
                        <Field
                          as={Input}
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
                        <Field
                          as={Input}
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
                        <Field
                          as={Input}
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
                        <Field
                          as={Input}
                          id="lastServicedDate"
                          name="lastServicedDate"
                          type="date"
                        />
                      }
                    />
                  </TableBody>
                </Table>
              </TableContainer>
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
            <Grid
              item
              alignContent={"flex-start"}
              justify={"space-evenly"}
              xs={12}
            >
              <Divider />
              <Button
                name="save"
                type="submit"
                color="secondary"
                variant="contained"
                disableElevation
              >
                Save
              </Button>
              <Button onClick={onCancel}>Cancel</Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
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

const shortISOFormat = (dateString: string) =>
  new Date(dateString).toISOString().slice(0, 16);

const yyyyMmDdFormat = (dateString: string) =>
  new Date(dateString).toISOString().slice(0, 10);
