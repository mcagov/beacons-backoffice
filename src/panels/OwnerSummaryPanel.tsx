import { Card, CardContent, CardHeader } from "@material-ui/core";
import { PanelViewState } from "components/dataPanel/PanelViewState";
import React, { FunctionComponent, useEffect, useState } from "react";
import { IOwner } from "../entities/IOwner";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";

interface OwnerSummaryPanelProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

export const OwnerSummaryPanel: FunctionComponent<OwnerSummaryPanelProps> = ({
  beaconsGateway,
  beaconId,
}) => {
  const [state, setState] = useState<DataPanelStates>(DataPanelStates.Loading);
  const [owner, setOwner] = useState<IOwner>();

  useEffect((): (() => void) => {
    let isMounted = true;
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);

        if (isMounted) {
          setOwner(beacon.owners[0]);
          setState(DataPanelStates.Viewing);
        }
      } catch (error) {
        console.error(error);
        setState(DataPanelStates.Error);
      }
    };

    fetchBeacon(beaconId);

    return () => {
      isMounted = false;
    };
  }, [beaconId, beaconsGateway]);

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
    },
  ];

  // TODO: Confirm with UCD what user feedback should be displayed if an error has occured when fetching a beacon
  const renderState = () => {
    switch (state) {
      case DataPanelStates.Viewing:
        return <PanelViewState fields={fields} splitAfter={fields.length} />;
      case DataPanelStates.Editing:
        return <p>TODO</p>;
      case DataPanelStates.Error:
        return <></>;
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader title="Owner" />
        {renderState()}
      </CardContent>
    </Card>
  );
};
