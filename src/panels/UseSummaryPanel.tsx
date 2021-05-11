import { Card, CardContent, CardHeader } from "@material-ui/core";
import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { Activity, IUse } from "entities/IUse";
import React, { FunctionComponent } from "react";

interface UseSummaryPanelProps {
  use: IUse;
  titlePrefix: string;
}

export const UseSummaryPanel: FunctionComponent<UseSummaryPanelProps> = ({
  use,
  titlePrefix,
}: UseSummaryPanelProps): JSX.Element => {
  const title = getCardHeaderTitle(titlePrefix, use);
  const fields = getPanelFields(use);

  return (
    <Card>
      <CardContent>
        <CardHeader title={title} />
        <PanelViewState fields={fields} />
      </CardContent>
    </Card>
  );
};

const getCardHeaderTitle = (titlePrefix: string, use: IUse): string => {
  let title = `${titlePrefix} use: `;
  title +=
    use.activity === Activity.Other
      ? use.otherActivity?.toUpperCase()
      : use.activity.replace(/_/, " ");

  if (use.purpose) {
    title += ` (${use.purpose})`;
  }

  return title;
};

const getPanelFields = (use: IUse): IField[] => [
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
];
