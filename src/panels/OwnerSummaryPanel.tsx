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
  const [fields, setFields] = useState<IField[]>([]);

  useEffect((): void => {
    const fetchBeacon = async (id: string) => {
      const beacon = await beaconsGateway.getBeacon(id);
      const owner = beacon.owners[0];
      setFields([
        { key: "Name", value: owner.fullName },
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
    };

    fetchBeacon(beaconId);
  }, [beaconId, beaconsGateway]);

  return (
    <Card>
      <CardContent>
        <CardHeader title="Owner" />
        <PanelViewState fields={fields} />
      </CardContent>
    </Card>
  );
};
