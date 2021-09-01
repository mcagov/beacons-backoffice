import { ILegacyBeacon } from "entities/ILegacyBeacon";
import { FunctionComponent } from "react";
import { formatLegacyOwners, formatLegacyUses } from "utils/writingStyle";
import { PanelViewingState } from "../../components/dataPanel/PanelViewingState";

export const LegacyBeaconSummaryViewing: FunctionComponent<{
  legacyBeacon: ILegacyBeacon;
}> = ({ legacyBeacon }) => {
  const fields = [
    {
      key: "Manufacturer",
      value: legacyBeacon?.manufacturer,
    },
    {
      key: "Model",
      value: legacyBeacon?.model,
    },
    {
      key: "Serial number",
      value: legacyBeacon?.manufacturerSerialNumber,
    },
    // {
    //   key: "CHK code",
    //   value: beacon?.chkCode,
    // },
    {
      key: "Protocol code",
      value: legacyBeacon?.protocol,
    },
    {
      key: "Coding method",
      value: legacyBeacon?.coding,
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
      key: "Created date",
      value: legacyBeacon?.createdDate,
    },
    {
      key: "Last modified date",
      value: legacyBeacon.lastModifiedDate,
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
      key: "Notes",
      value: legacyBeacon?.note || "",
    },
  ];

  return <PanelViewingState fields={fields} columns={2} splitAfter={7} />;
};
