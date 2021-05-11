import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Activity, IUse } from "entities/IUse";
import React, { FunctionComponent, ReactNode } from "react";
import { VesselCommunications } from "./maritime/VesselCommunications";
import { VesselSummary } from "./maritime/VesselSummary";
import { MoreDetails } from "./MoreDetails";

interface UseSummaryPanelProps {
  use: IUse;
  titlePrefix: string;
}

export const UseSummaryPanel: FunctionComponent<UseSummaryPanelProps> = ({
  use,
  titlePrefix,
}: UseSummaryPanelProps): JSX.Element => {
  const title = getCardHeaderTitle(titlePrefix, use);
  const useSummary: ReactNode = getUseSummary(use);

  return (
    <Card>
      <CardContent>
        <CardHeader title={title} />
        {useSummary}
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

const getUseSummary = (use: IUse): ReactNode => {
  return getMaritimeSummary(use);
};

const getMaritimeSummary = (use: IUse): ReactNode => (
  <>
    <VesselSummary use={use} />
    <VesselCommunications use={use} />
    <MoreDetails use={use} />
  </>
);
