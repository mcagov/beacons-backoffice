import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { IUse } from "entities/IUse";
import React, { FunctionComponent } from "react";

interface VesselSummaryProps {
  use: IUse;
}

export const VesselSummary: FunctionComponent<VesselSummaryProps> = ({
  use,
}: VesselSummaryProps): JSX.Element => {
  const fields: IField[] = [
    { key: "Max persons onboard", value: `${use?.maxCapacity}` },
    { key: "Vessel name", value: use?.vesselName },
    { key: "Beacon position", value: use?.beaconLocation },
    { key: "Port Letter and Number (PLN)", value: use?.portLetterNumber },
    { key: "Homeport", value: use?.homeport },
    { key: "Area of operation", value: use?.areaOfOperation },
    { key: "IMO number", value: `${use?.imoNumber}` },
    { key: "UK Small Ships Register (SSR) number", value: use?.ssrNumber },
    {
      key: "Registry of Shipping and Seamen (RSS) number",
      value: use?.rssNumber,
    },
    {
      key: "Vessel official number",
      value: use?.officialNumber,
    },
    {
      key: "Windfarm or rig platform location",
      value: use?.rigPlatformLocation,
    },
    {
      key: "Call sign",
      value: use?.callSign,
    },
  ];

  return <PanelViewState fields={fields} />;
};
