import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { IUse } from "entities/IUse";
import { FunctionComponent } from "react";

interface AircraftSummaryProps {
  use: IUse;
}

export const AircraftSummary: FunctionComponent<AircraftSummaryProps> = ({
  use,
}: AircraftSummaryProps): JSX.Element => {
  const fields: IField[] = [
    {
      key: "Max persons onboard",
      value: `${use.maxCapacity || ""}`,
    },
    {
      key: "Manufacturer and model",
      value: use?.aircraftManufacturer,
    },
    {
      key: "Principal airport",
      value: use?.principalAirport,
    },
    {
      key: "Secondary airport",
      value: use?.secondaryAirport,
    },
    {
      key: "Registration mark",
      value: use?.registrationMark,
    },
    {
      key: "24-bit hex address",
      value: use?.hexAddress,
    },
    {
      key: "Core serial number",
      value: use?.cnOrMsnNumber,
    },
    {
      key: "Is this a dongle?",
      value: use?.dongle === true ? "yes" : "no",
    },
    {
      key: "Beacon position",
      value: use?.beaconPosition,
    },
  ];

  return <PanelViewState fields={fields} />;
};
