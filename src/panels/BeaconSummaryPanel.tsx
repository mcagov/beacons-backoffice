import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FieldValueTypes } from "../components/dataPanel/FieldValue";
import {
  DataPanelStates,
  PanelViewState,
} from "../components/dataPanel/PanelViewState";
import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import {
  formatEmergencyContacts,
  formatOwners,
  formatUses,
} from "../useCases/mcaWritingStyleFormatter";

interface IBeaconSummaryProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
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
        console.error(error);
        setState(DataPanelStates.Error);
      }
    };

    fetchBeacon(beaconId);
  }, []); // eslint-disable-line

  const fields = [
    {
      key: "Manufacturer",
      value: beacon?.manufacturer,
    },
    {
      key: "Model",
      value: beacon?.model,
    },
    {
      key: "Beacon type",
      value: beacon?.type,
    },
    {
      key: "Protocol code",
      value: beacon?.protocolCode,
    },
    {
      key: "Serial number",
      value: beacon?.manufacturerSerialNumber,
    },
    {
      key: "CHK code",
      value: beacon?.chkCode,
    },
    {
      key: "Battery expiry date",
      value: beacon?.batteryExpiryDate,
      valueType: FieldValueTypes.DATE,
    },
    {
      key: "Last serviced date",
      value: beacon?.lastServicedDate,
      valueType: FieldValueTypes.DATE,
    },
    {
      key: "Owner(s)",
      value: formatOwners(beacon?.owners || []),
    },
    {
      key: "Emergency contacts",
      value: formatEmergencyContacts(beacon?.emergencyContacts || []),
    },
    {
      key: "Registered uses",
      value: formatUses(beacon?.uses || []),
    },
  ];

  const renderState = (state: DataPanelStates) => {
    switch (state) {
      case DataPanelStates.Loading:
        return <LoadingState />;
      case DataPanelStates.Viewing:
        return <PanelViewState fields={fields} columns={2} splitAfter={8} />;
      case DataPanelStates.Editing:
        return <p>TODO</p>;
      case DataPanelStates.Error:
        return <ErrorState message="An error occurred" />;
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader title="Summary" />
        {renderState(state)}
      </CardContent>
    </Card>
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

const ErrorState: FunctionComponent<IPanelError> = ({
  message,
}): JSX.Element => (
  <Box role="alert" textAlign="center">
    <ErrorOutlineIcon />
    <Typography>{message}</Typography>
  </Box>
);
