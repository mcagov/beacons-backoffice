import { FunctionComponent } from "react";
import { PanelViewingState } from "../../components/dataPanel/PanelViewingState";
import { IBeacon } from "../../entities/IBeacon";
import { formatMonth } from "../../utils/dateTime";
import {
  formatEmergencyContacts,
  formatOwners,
  formatUses,
} from "../../utils/writingStyle";

export const BeaconSummaryViewing: FunctionComponent<{
  beacon: IBeacon;
}> = ({ beacon }) => {
  const fields = [
    {
      key: "Manufacturer",
      value: beacon?.manufacturer,
    },
    {
      key: "Model",
      value: beacon?.model,
    },
    {
      key: "Protocol code",
      value: beacon?.protocolCode,
    },
    {
      key: "Coding method",
      value: beacon?.codingMethod,
    },
    {
      key: "Serial number",
      value: beacon?.manufacturerSerialNumber,
    },
    {
      key: "CHK code",
      value: beacon?.chkCode,
    },
    {
      key: "Battery expiry date",
      value: formatMonth(beacon?.batteryExpiryDate),
    },
    {
      key: "Last serviced date",
      value: formatMonth(beacon?.lastServicedDate),
    },
    {
      key: "Owner(s)",
      value: formatOwners(beacon?.owners || []),
    },
    {
      key: "Emergency contacts",
      value: formatEmergencyContacts(beacon?.emergencyContacts || []),
    },
    {
      key: "Registered uses",
      value: formatUses(beacon?.uses || []),
    },
  ];

  return <PanelViewingState fields={fields} columns={2} splitAfter={8} />;
};