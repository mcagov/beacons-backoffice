import { ILegacyBeacon } from "entities/ILegacyBeacon";
import { FunctionComponent } from "react";
import { formatLegacyOwners, formatLegacyUses } from "utils/writingStyle";
import { PanelViewingState } from "../../components/dataPanel/PanelViewingState";

export const LegacyBeaconSummaryViewing: FunctionComponent<{
  legacyBeacon: ILegacyBeacon;
}> = ({ legacyBeacon }) => {
  const fields = [
    {
      key: "Beacon status",
      value: legacyBeacon?.beaconStatus,
    },
    {
      key: "Manufacturer",
      value: legacyBeacon?.manufacturer,
    },
    {
      key: "Model",
      value: legacyBeacon?.model,
    },
    {
      key: "Manufacturer serial number",
      value: legacyBeacon?.manufacturerSerialNumber,
    },
    // {
    //   key: "CHK code",
    //   value: beacon?.chkCode,
    // },

    {
      key: "Coding",
      value: legacyBeacon?.coding,
    },
    {
      key: "Protocol code",
      value: legacyBeacon?.protocol,
    },
    {
      key: "Battery expiry date",
      value: legacyBeacon?.batteryExpiryDate,
    },
    {
      key: "Last serviced date",
      value: legacyBeacon?.lastServiceDate,
    },
    {
      key: "First registration date",
      value: legacyBeacon?.firstRegistrationDate,
    },
    {
      key: "Created date",
      value: legacyBeacon?.createdDate,
    },
    {
      key: "Last modified date",
      value: legacyBeacon.lastModifiedDate,
    },
    {
      key: "Cospas sarsat number",
      value: legacyBeacon?.cospasSarsatNumber?.toString(),
    },
    {
      key: "Department reference",
      value: legacyBeacon?.departRefId,
    },
    {
      key: "Is withdrawn",
      value: legacyBeacon?.isWithdrawn,
    },
    {
      key: "Withdrawn reason",
      value: legacyBeacon?.withdrawnReason,
    },
    {
      key: "Owner(s)",
      value: formatLegacyOwners(
        legacyBeacon.owner || [],
        ...(legacyBeacon.secondaryOwners || [])
      ),
    },
    {
      key: "Emergency contacts",
      value: legacyBeacon?.emergencyContact?.details,
    },
    {
      key: "Registered uses",
      value: formatLegacyUses(legacyBeacon?.uses || []),
    },
    {
      key: "Emergency contacts",
      value: legacyBeacon?.emergencyContact?.details,
    },
    {
      key: "Notes",
      value: legacyBeacon?.note || "",
    },
  ];

  return <PanelViewingState fields={fields} columns={2} splitAfter={14} />;
};
