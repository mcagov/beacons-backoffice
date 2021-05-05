import { Card, CardContent, CardHeader } from "@material-ui/core";
import { PanelViewState } from "components/dataPanel/PanelViewState";
import React, { FunctionComponent, useEffect, useState } from "react";
import { IEmergencyContact } from "../entities/IEmergencyContact";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";

interface EmergencyContactSummaryPanelProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

export const EmergencyContactSummaryPanel: FunctionComponent<EmergencyContactSummaryPanelProps> = ({
  beaconsGateway,
  beaconId,
}) => {
  const [emergencyContacts, setEmergencyContacts] = useState<
    IEmergencyContact[]
  >([]);

  useEffect((): (() => void) => {
    let isMounted = true;

    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);
        if (isMounted) {
          setEmergencyContacts(beacon.emergencyContacts);
        }
      } catch (error) {
        // TODO: Confirm with UCD what user feedback should be displayed if an error has occured when fetching a beacon
        console.error(error);
      }
    };

    fetchBeacon(beaconId);

    return () => {
      isMounted = false;
    };
  }, [beaconId, beaconsGateway]);

  const fields = emergencyContacts.map((emergencyContact) => [
    { key: "Name", value: emergencyContact.fullName },
    {
      key: "Telephone",
      value: [
        emergencyContact.telephoneNumber,
        emergencyContact.alternativeTelephoneNumber,
      ],
    },
  ]);

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
