import { Card, CardContent, CardHeader } from "@material-ui/core";
import { FunctionComponent, useEffect, useState } from "react";
import { EditPanelButton } from "../../components/dataPanel/EditPanelButton";
import { ErrorState } from "../../components/dataPanel/PanelErrorState";
import { LoadingState } from "../../components/dataPanel/PanelLoadingState";
import { DataPanelStates } from "../../components/dataPanel/States";
import { IBeacon } from "../../entities/IBeacon";
import { IBeaconsGateway } from "../../gateways/IBeaconsGateway";
import { Placeholders } from "../../useCases/mcaWritingStyleFormatter";
import { EditingState } from "./EditingState";
import { ViewingState } from "./ViewingState";

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
    beaconsGateway.updateBeacon(beacon.id, beacon).then((success) => {
      success ? setUserState(DataPanelStates.Viewing) : setError(true);
    });
  };

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
            <ViewingState beacon={beacon} />
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
        setError(true);
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
