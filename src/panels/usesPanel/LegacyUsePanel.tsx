import { Card, CardContent, CardHeader } from "@material-ui/core";
import { IField } from "components/dataPanel/IField";
import { PanelViewingState } from "components/dataPanel/PanelViewingState";
import { ILegacyUse } from "entities/ILegacyBeacon";
import React, { FunctionComponent } from "react";

interface LegacyUseSummaryPanelProps {
  use: ILegacyUse;
  titlePrefix: string;
}

export const LegacyUsePanel: FunctionComponent<LegacyUseSummaryPanelProps> = ({
  use,
  titlePrefix,
}: LegacyUseSummaryPanelProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <CardHeader title={cardHeaderTitle(titlePrefix, use)} />
        <PanelViewingState fields={getFields(use)} />
      </CardContent>
    </Card>
  );
};

const cardHeaderTitle = (titlePrefix: string, use: ILegacyUse): string => {
  const usePrefix = `${titlePrefix} use: `;
  const useOverview = use.useType.toUpperCase();
  return usePrefix + useOverview;
};

const getFields = (use: ILegacyUse): IField[] => [
  { key: "Use type", value: use?.useType },
  { key: "Max persons onboard", value: `${use.maxPersons || ""}` },

  { key: "Vessel name", value: use?.vesselName },
  { key: "Vessel type", value: use?.vesselType },

  { key: "Beacon position", value: use?.beaconPosition },
  { key: "Position", value: use?.position },

  { key: "Port Letter and Number (PLN)", value: use?.fishingVesselPln },
  { key: "Homeport", value: use?.homePort },
  { key: "Area of operation", value: use?.areaOfUse },
  { key: "IMO number", value: use?.imoNumber },
  { key: "UK Small Ships Register (SSR) number", value: use?.rssSsrNumber },
  {
    key: "Registry of Shipping and Seamen (RSS) number",
    value: use?.rssSsrNumber,
  },
  { key: "Vessel official number", value: use?.officialNumber },

  { key: "Official Number", value: use?.officialNumber },
  { key: "Callsign", value: use?.callSign },
  { key: "Hull Id Number", value: use?.hullIdNumber },
  { key: "CG66 Ref Number", value: use?.cg66RefNumber },
  { key: "AOD SerialNumber", value: use?.aodSerialNumber },

  { key: "Principal Airport", value: use?.principalAirport },
  { key: "Aircraft RegistrationMark", value: use?.aircraftRegistrationMark },
  { key: "Aircraft Description", value: use?.aircraftDescription },
  { key: "Aircraft Type", value: use?.aircraftType },

  { key: "Survival Craft Type", value: use?.survivalCraftType },
  { key: "Bit 24 Address Hex", value: use?.bit24AddressHex },
  { key: "Local Management Id", value: use?.localManagementId },
  { key: "Trip Info", value: use?.tripInfo },

  { key: "Communications", value: use?.communications },

  { key: "Land Use", value: use?.landUse },
  { key: "Rig Name", value: use?.rigName },

  { key: "Pennant Number", value: use?.pennantNumber },
  { key: "Is Main Use", value: use?.isMain },
  { key: "Created Date", value: use?.createdDate },
  { key: "Last Modified Date", value: use?.lastModifiedDate },
  { key: "Notes", value: use?.notes },
  { key: "More Notes", value: use?.note },

  // { key: "versioning", value: use?.versioning.toString() },
  // { key: "updateUserId", value: use?.updateUserId.toString() },
  // { key: "createUserId", value: use?.createUserId.toString() },
  // { key: "fk Beacon Id", value: use?.fkBeaconId.toString() },
  // { key: "pk Beacon Uses Id", value: use?.pkBeaconUsesId.toString() }
];
