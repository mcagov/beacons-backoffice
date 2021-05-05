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
  const [owner, setOwner] = useState<IOwner>();

  useEffect((): Destructor => {
    let isMounted = true;
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);

        if (isMounted) {
          setOwner(beacon.owners[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeacon(beaconId);

    return () => (isMounted = false);
  }, []);

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

  return (
    <Card>
      <CardContent>
        <CardHeader title="Owner" />
        <PanelViewState fields={fields} />
      </CardContent>
    </Card>
  );
};
