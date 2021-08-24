import { ILegacyBeacon } from "entities/ILegacyBeacon";
import { FunctionComponent } from "react";
import { formatLegacyUses } from "utils/writingStyle";
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
      key: "Protocol",
      value: legacyBeacon?.protocol,
    },
    {
      key: "Coding",
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
      key: "Owner",
      value: legacyBeacon?.owner?.ownerName,
    },
    {
      key: "Emergency contacts",
      value: legacyBeacon?.emergencyContact?.details,
    },
    {
      key: "Registered uses",
      value: formatLegacyUses(legacyBeacon?.uses || []),
    },
  ];

  return <PanelViewingState fields={fields} columns={2} splitAfter={6} />;
};
