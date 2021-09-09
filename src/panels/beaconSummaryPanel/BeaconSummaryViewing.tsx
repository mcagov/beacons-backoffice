import { FunctionComponent } from "react";
import { PanelViewingState } from "../../components/dataPanel/PanelViewingState";
import { IBeacon } from "../../entities/IBeacon";
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
      key: "Serial number",
      value: beacon?.manufacturerSerialNumber,
    },
    {
      key: "CHK code",
      value: beacon?.chkCode,
    },
    {
      key: "Protocol code",
      value: beacon?.protocolCode,
    },
    {
      key: "Coding",
      value: beacon?.codingMethod,
    },
    {
      key: "Battery expiry date",
      // value: formatMonth(beacon?.batteryExpiryDate),
      value: beacon?.batteryExpiryDate,
    },
    {
      key: "Last serviced date",
      // value: formatMonth(beacon?.lastServicedDate),
      value: beacon?.lastServicedDate,
    },
    {
      key: "Created date",
      value: beacon?.registeredDate,
    },
    {
      key: "Last modified date",
      value: beacon?.lastModifiedDate,
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

  return <PanelViewingState fields={fields} columns={2} splitAfter={10} />;
};
