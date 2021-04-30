import {
  Box,
  CardHeader,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, { FunctionComponent, useEffect, useState } from "react";
import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import {
  formatDate,
  formatOwners,
  formatUses,
} from "../useCases/mcaWritingStyleFormatter";
import { FieldValue } from "./FieldValue";

interface IBeaconSummaryProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

enum DataPanelStates {
  Loading = "LOADING",
  Viewing = "VIEWING",
  Editing = "Editing",
  Error = "ERROR",
}

export const BeaconSummaryPanel: FunctionComponent<IBeaconSummaryProps> = ({
  beaconsGateway,
  beaconId,
}): JSX.Element => {
  const [state, setState] = useState<DataPanelStates>(DataPanelStates.Loading);
  const [beacon, setBeacon] = useState<IBeacon>({} as IBeacon);

  useEffect((): void => {
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);
        setBeacon(beacon);
        setState(DataPanelStates.Viewing);
      } catch (error) {
        console.log(error);
        setState(DataPanelStates.Error);
      }
    };

    fetchBeacon(beaconId);
  }, []); // eslint-disable-line

  const renderState = (state: DataPanelStates) => {
    switch (state) {
      case DataPanelStates.Loading:
        return <LoadingState />;
      case DataPanelStates.Viewing:
        return <ViewingState beacon={beacon} />;
      case DataPanelStates.Editing:
        return <p>TODO</p>;
      case DataPanelStates.Error:
        return <ErrorState message="An error occurred" />;
    }
  };

  return (
    <Paper>
      <CardHeader title="Summary" />
      {renderState(state)}
    </Paper>
  );
};

interface IPanelError {
  message: string;
}

const LoadingState: FunctionComponent = () => (
  <Box textAlign="center">
    <CircularProgress />
  </Box>
);

interface ViewingStateProps {
  beacon: IBeacon;
}

const ViewingState: FunctionComponent<ViewingStateProps> = ({ beacon }) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Manufacturer:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{beacon?.manufacturer}</FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Model:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{beacon?.model}</FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Beacon type:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{beacon?.type}</FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Protocol code:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{beacon?.protocolCode}</FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Serial number:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{beacon?.manufacturerSerialNumber}</FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>CHK code:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{beacon?.chkCode}</FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Battery expiry date:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>
                    {formatDate(beacon?.batteryExpiryDate)}
                  </FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Last service date:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>
                    {formatDate(beacon?.lastServicedDate)}
                  </FieldValue>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6}>
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Owner(s):</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{formatOwners(beacon?.owners)}</FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Emergency contacts:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{`${beacon?.emergencyContacts.length} listed`}</FieldValue>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Registered uses:</Typography>
                </TableCell>
                <TableCell>
                  <FieldValue>{formatUses(beacon?.uses)}</FieldValue>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const ErrorState: FunctionComponent<IPanelError> = ({
  message,
}): JSX.Element => (
  <Box role="alert" textAlign="center">
    <ErrorOutlineIcon />
    <Typography>{message}</Typography>
  </Box>
);
