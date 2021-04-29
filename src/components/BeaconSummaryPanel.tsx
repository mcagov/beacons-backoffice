import {
  CardHeader,
  CircularProgress,
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
import { IUse } from "../entities/IUse";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { formatDate, titleCase } from "../useCases/mcaWritingStyleFormatter";

interface IBeaconSummaryProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

interface IBeaconSummaryState {
  beacon?: IBeacon;
  isError: Boolean;
  errorMessage?: string;
}

export const BeaconSummaryPanel: FunctionComponent<IBeaconSummaryProps> = ({
  beaconsGateway,
  beaconId,
}): JSX.Element => {
  const [state, setState] = useState<IBeaconSummaryState>({
    isError: false,
  });

  useEffect((): void => {
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);
        setState({
          ...state,
          isError: false,
          beacon,
        });
      } catch (error) {
        setState({
          ...state,
          isError: true,
          errorMessage: error?.message,
        });
      }
    };

    fetchBeacon(beaconId);
  }, []); // eslint-disable-line

  return (
    <Paper>
      <CardHeader title="Summary" />
      {state.isError && <PanelError message={state.errorMessage as string} />}
      {state.beacon ? (
        <TableContainer>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Manufacturer:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{state.beacon?.manufacturer}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Model:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{state.beacon?.model}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Beacon type:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{state.beacon?.type}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Protocol code:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{state.beacon?.protocolCode}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Serial number:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {state.beacon?.manufacturerSerialNumber}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>CHK code:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{state.beacon?.chkCode}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Battery expiry date:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatDate(state.beacon?.batteryExpiryDate)}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography>Last service date:</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {formatDate(state.beacon?.lastServicedDate)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <CircularProgress />
      )}
    </Paper>
  );
};

export const formatUses = (uses: IUse[]): string =>
  uses.reduce((formattedUses, use, index, uses) => {
    if (index === uses.length - 1) return formattedUses + formatUse(use);
    return formattedUses + formatUse(use) + ", ";
  }, "");

const formatUse = (use: IUse): string => {
  const formattedActivity = titleCase(use.activity);
  const formattedPurpose = use.purpose ? ` (${titleCase(use.purpose)})` : "";
  return formattedActivity + formattedPurpose;
};

interface IPanelError {
  message: string;
}

const PanelError: FunctionComponent<IPanelError> = ({
  message,
}): JSX.Element => (
  <div>
    <ErrorOutlineIcon />
    <Typography>{message}</Typography>
  </div>
);
