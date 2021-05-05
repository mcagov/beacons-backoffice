import { Card, CardContent, CardHeader } from "@material-ui/core";
import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import React, { FunctionComponent, useEffect, useState } from "react";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";

interface EmergencyContactSummaryPanelProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

export const EmergencyContactSummaryPanel: FunctionComponent<EmergencyContactSummaryPanelProps> = ({
  beaconsGateway,
  beaconId,
}) => {
  const [fields, setFields] = useState<IField[][]>([]);

  useEffect((): void => {
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);
        const emergencyContacts = beacon.emergencyContacts.map(
          (emergencyContact) => [
            { key: "Name", value: emergencyContact.fullName },
            {
              key: "Telephone",
              value: [
                emergencyContact.telephoneNumber,
                emergencyContact.alternativeTelephoneNumber,
              ],
            },
          ]
        );

        setFields(emergencyContacts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeacon(beaconId);
  }, []);

  if (fields.length > 0) {
    return (
      <>
        {fields.map((field, index) => (
          <Card key={index}>
            <CardContent>
              <CardHeader title={`Emergency Contact ${index + 1}`} />
              <PanelViewState fields={field} />
            </CardContent>
          </Card>
        ))}
      </>
    );
  } else {
    return <NoEmergencyContacts />;
  }
};

const NoEmergencyContacts = () => (
  <Card>
    <CardContent>
      <CardHeader title="No emergency contacts" />
    </CardContent>
  </Card>
);
