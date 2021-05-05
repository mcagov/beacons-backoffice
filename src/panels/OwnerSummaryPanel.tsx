import { Card, CardContent, CardHeader } from "@material-ui/core";
import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import React, { FunctionComponent, useEffect, useState } from "react";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";

interface OwnerSummaryPanelProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

export const OwnerSummaryPanel: FunctionComponent<OwnerSummaryPanelProps> = ({
  beaconsGateway,
  beaconId,
}) => {
  let updates = 0;
  const [fields, setFields] = useState<IField[]>([]);

  useEffect((): void => {
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);
        const owner = beacon.owners[0];
        setFields([
          { key: "Name", value: owner.fullName + " " + updates },
          { key: "Telephone", value: owner.telephoneNumber },
          { key: "Email", value: owner.email },
          {
            key: "Address",
            value: [
              owner.addressLine1,
              owner.addressLine2,
              owner.townOrCity,
              owner.county,
              owner.postcode,
            ],
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeacon(beaconId);
  }, [updates]);

  setTimeout(() => {
    updates++;
  }, 10000);

  return (
    <Card>
      <CardContent>
        <CardHeader title="Owner" />
        <PanelViewState fields={fields} />
      </CardContent>
    </Card>
  );
};
