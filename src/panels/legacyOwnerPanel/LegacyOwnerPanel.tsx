import { Card, CardContent, CardHeader } from "@material-ui/core";
import { ILegacyOwner } from "entities/ILegacyBeacon";
import { FunctionComponent, useState } from "react";
import { FieldValueTypes } from "../../components/dataPanel/FieldValue";
import { ErrorState } from "../../components/dataPanel/PanelErrorState";
import { PanelViewingState } from "../../components/dataPanel/PanelViewingState";
import { Placeholders } from "../../utils/writingStyle";

interface LegacyOwnerSummaryPanelProps {
  legacyOwner: ILegacyOwner;
  secondaryLegacyOwners: ILegacyOwner[];
}

export const LegacyOwnerPanel: FunctionComponent<LegacyOwnerSummaryPanelProps> =
  ({ legacyOwner, secondaryLegacyOwners }) => {
    const [error] = useState(false);
    let buildOwnerFields = function (legacyOwner: ILegacyOwner) {
      return [
        { key: "Owner Name", value: legacyOwner?.ownerName },
        { key: "Company Name", value: legacyOwner?.companyName },
        { key: "Phone 1", value: legacyOwner?.phone1 },
        { key: "Phone 2", value: legacyOwner?.phone2 },
        { key: "Mobile 1", value: legacyOwner?.mobile1 },
        { key: "Mobile 2", value: legacyOwner?.mobile2 },
        { key: "Email", value: legacyOwner?.email },
        {
          key: "Address",
          value: [
            legacyOwner?.address1,
            legacyOwner?.address2,
            legacyOwner?.address3,
            legacyOwner?.address4,
            legacyOwner?.postCode,
            legacyOwner?.country,
          ],
          valueType: FieldValueTypes.MULTILINE,
        },
        { key: "Fax", value: legacyOwner?.fax },
        // { key: "Created Date", value: legacyOwner?.createdDate },
        // { key: "Last Modified Date", value: legacyOwner?.lastModifiedDate },
        { key: "Care Of", value: legacyOwner?.careOf },
        { key: "Is Main Owner", value: legacyOwner?.isMain },

        // { key: "Create User Id", value: legacyOwner?.createUserId },
        // { key: "fk Beacon Id", value: legacyOwner?.fkBeaconId },
        // { key: "pk Beacon Owner Id", value: legacyOwner?.pkBeaconOwnerId },
        // { key: "Versioning", value: legacyOwner?.versioning },
      ];
    };

    const mainOwnerFields = buildOwnerFields(legacyOwner);

    return (
      <>
        <Card key={`main_owner`}>
          <CardContent>
            <CardHeader title="Main Owner" />
            <>
              {error && <ErrorState message={Placeholders.UnspecifiedError} />}
              {error || <PanelViewingState fields={mainOwnerFields} />}
            </>
          </CardContent>
        </Card>
        <br />
        {secondaryLegacyOwners?.map((secondaryLegacyOwner, index) => (
          <>
            <Card key={"owner_" + index}>
              <CardContent>
                <CardHeader title={`Owner`} />
                <>
                  {error && (
                    <ErrorState message={Placeholders.UnspecifiedError} />
                  )}
                  {error || (
                    <PanelViewingState
                      fields={buildOwnerFields(secondaryLegacyOwner)}
                    />
                  )}
                </>
              </CardContent>
            </Card>
            <br />
          </>
        ))}
      </>
    );
  };
