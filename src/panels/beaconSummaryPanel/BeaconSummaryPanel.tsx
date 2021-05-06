import { Card, CardContent, CardHeader } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { EditPanelButton } from "../../components/dataPanel/EditPanelButton";
import { ErrorState } from "../../components/dataPanel/PanelErrorState";
import { LoadingState } from "../../components/dataPanel/PanelLoadingState";
import { PanelViewingState } from "../../components/dataPanel/PanelViewingState";
import { DataPanelStates } from "../../components/dataPanel/States";
import { IBeacon } from "../../entities/IBeacon";
import { IBeaconsGateway } from "../../gateways/IBeaconsGateway";
import {
  formatEmergencyContacts,
  formatOwners,
  formatUses,
} from "../../useCases/mcaWritingStyleFormatter";
import { EditingState } from "./EditingState";

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
    },
    {
      key: "Last serviced date",
      value: beacon?.lastServicedDate,
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
        return (
          <>
            <EditPanelButton
              onClick={() => setState(DataPanelStates.Editing)}
            />
            <PanelViewingState fields={fields} columns={2} splitAfter={8} />;
          </>
        );
      case DataPanelStates.Editing:
        return (
          <EditingState beacon={beacon} onSave={() => {}} onCancel={() => {}} />
        );
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
