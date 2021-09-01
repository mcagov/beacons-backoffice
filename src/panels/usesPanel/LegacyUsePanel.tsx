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
  { key: "Beacon position", value: use?.beaconPosition },
  { key: "Position", value: use?.position },

  { key: "Vessel name", value: use?.vesselName },
  { key: "Vessel type", value: use?.vesselType },
  { key: "Port Letter and Number (PLN)", value: use?.fishingVesselPln },
  { key: "Homeport", value: use?.homePort },
  { key: "Area of operation", value: use?.areaOfUse },
  { key: "IMO number", value: use?.imoNumber },
  { key: "SSR / RSS number", value: use?.rssSsrNumber },
  { key: "Hull ID number", value: use?.hullIdNumber },
  { key: "Official number", value: use?.officialNumber },
  { key: "CG66 reference number", value: use?.cg66RefNumber },
  { key: "AOD serial number", value: use?.aodSerialNumber },

  { key: "Principal airport", value: use?.principalAirport },
  { key: "Aircraft registrationMark", value: use?.aircraftRegistrationMark },
  { key: "Aircraft description", value: use?.aircraftDescription },
  { key: "Aircraft type", value: use?.aircraftType },

  { key: "Land Use", value: use?.landUse },
  { key: "Rig Name", value: use?.rigName },

  { key: "Callsign", value: use?.callSign },
  { key: "Survival Craft Type", value: use?.survivalCraftType },
  { key: "Bit 24 address hex", value: use?.bit24AddressHex },
  { key: "Pennant number", value: use?.pennantNumber },
  { key: "Local management ID", value: use?.localManagementId },
  { key: "Trip Info", value: use?.tripInfo },
  { key: "Communications", value: use?.communications },
  { key: "Is main use", value: use?.isMain },
  { key: "Created date", value: use?.createdDate },
  { key: "Last modified date", value: use?.lastModifiedDate },
  { key: "Notes", value: use?.notes },
  { key: "More notes", value: use?.note },

  // { key: "versioning", value: use?.versioning.toString() },
  // { key: "updateUserId", value: use?.updateUserId.toString() },
  // { key: "createUserId", value: use?.createUserId.toString() },
  // { key: "fk Beacon Id", value: use?.fkBeaconId.toString() },
  // { key: "pk Beacon Uses Id", value: use?.pkBeaconUsesId.toString() }
];
