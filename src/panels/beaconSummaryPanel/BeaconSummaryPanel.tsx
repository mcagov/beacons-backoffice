import { Card, CardContent, CardHeader } from "@material-ui/core";
import { FunctionComponent, useEffect, useState } from "react";
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
  Placeholders,
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
  const [beacon, setBeacon] = useState<IBeacon>({} as IBeacon);
  const [userState, setUserState] = useState<DataPanelStates>(
    DataPanelStates.Viewing
  );
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect((): void => {
    const fetchBeacon = async (id: string) => {
      try {
        setLoading(true);
        const beacon = await beaconsGateway.getBeacon(id);
        setBeacon(beacon);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchBeacon(beaconId);
  }, [userState, beaconId, beaconsGateway]);

  const handleSave = (beacon: IBeacon): void => {
    beaconsGateway.saveBeacon(beacon.id, beacon).then((success) => {
      success ? setUserState(DataPanelStates.Viewing) : setError(true);
    });
  };

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
      case DataPanelStates.Viewing:
        return (
          <>
            <EditPanelButton
              onClick={() => setUserState(DataPanelStates.Editing)}
            >
              Edit summary
            </EditPanelButton>
            <PanelViewingState fields={fields} columns={2} splitAfter={8} />
          </>
        );
      case DataPanelStates.Editing:
        return (
          <EditingState
            beacon={beacon}
            onSave={(beacon: IBeacon) => handleSave(beacon)}
            onCancel={() => setUserState(DataPanelStates.Viewing)}
          />
        );
      default:
        return <p>I'm a DOM element</p>;
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader title="Summary" />
        <>
          {error && <ErrorState message={Placeholders.UnspecifiedError} />}
          {loading && <LoadingState />}
          {error || loading || renderState(userState)}
        </>
      </CardContent>
    </Card>
  );
};
