import { Card, CardContent, CardHeader } from "@material-ui/core";
import { PanelViewingState } from "components/dataPanel/PanelViewingState";
import React, { FunctionComponent, useEffect, useState } from "react";
import { FieldValueTypes } from "../components/dataPanel/FieldValue";
import { ErrorState } from "../components/dataPanel/PanelErrorState";
import { LoadingState } from "../components/dataPanel/PanelLoadingState";
import { DataPanelStates } from "../components/dataPanel/States";
import { IOwner } from "../entities/IOwner";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { Placeholders } from "../utils/mcaWritingStyleFormatter";

interface OwnerSummaryPanelProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

export const OwnerSummaryPanel: FunctionComponent<OwnerSummaryPanelProps> = ({
  beaconsGateway,
  beaconId,
}) => {
  const [owner, setOwner] = useState<IOwner>();
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
        setOwner(beacon.owners[0]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    fetchBeacon(beaconId);
  }, [userState, beaconId, beaconsGateway]);

  const fields = [
    { key: "Name", value: owner?.fullName },
    { key: "Telephone", value: owner?.telephoneNumber },
    { key: "Email", value: owner?.email },
    {
      key: "Address",
      value: [
        owner?.addressLine1,
        owner?.addressLine2,
        owner?.townOrCity,
        owner?.county,
        owner?.postcode,
      ],
      valueType: FieldValueTypes.MULTILINE,
    },
  ];

  const renderState = () => {
    switch (userState) {
      case DataPanelStates.Viewing:
        return <PanelViewingState fields={fields} />;
      case DataPanelStates.Editing:
        return <p>TODO</p>;
      default:
        setError(true);
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader title="Owner" />
        <>
          {error && <ErrorState message={Placeholders.UnspecifiedError} />}
          {loading && <LoadingState />}
          {error || loading || renderState()}
        </>
      </CardContent>
    </Card>
  );
};
