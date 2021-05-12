import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { IUse } from "entities/IUse";
import { FunctionComponent } from "react";

interface AviationSummaryProps {
  use: IUse;
}

export const AviationSummary: FunctionComponent<AviationSummaryProps> = ({
  use,
}: AviationSummaryProps): JSX.Element => {
  const fields: IField[] = [];
  fields.push(...getAircraftSummaryFields(use));

  fields.push({
    key: "More details",
    value: use?.moreDetails,
  });

  return <PanelViewState fields={fields} />;
};

const getAircraftSummaryFields = (use: IUse): IField[] => [
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
