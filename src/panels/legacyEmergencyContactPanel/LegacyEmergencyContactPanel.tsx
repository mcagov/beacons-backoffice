import { Card, CardContent, CardHeader } from "@material-ui/core";
import { PanelViewingState } from "components/dataPanel/PanelViewingState";
import { ILegacyEmergencyContact } from "entities/ILegacyBeacon";
import React, { FunctionComponent } from "react";

interface LegacyEmergencyContactPanelProps {
  legacyEmergencyContact: ILegacyEmergencyContact;
}

export const LegacyEmergencyContactPanel: FunctionComponent<LegacyEmergencyContactPanelProps> =
  ({ legacyEmergencyContact }) => {
    const fields = [{ key: "Details", value: legacyEmergencyContact?.details }];

    if (fields.length > 0) {
      return (
        <>
          {fields.map((field, index) => (
            <Card key={index}>
              <CardContent>
                <CardHeader title={`Emergency Contact`} />
                <PanelViewingState fields={fields} />
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
