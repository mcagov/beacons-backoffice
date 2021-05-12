import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Activities, Environments, IUse } from "entities/IUse";
import React, { FunctionComponent, ReactNode } from "react";
import { AviationSummary } from "./AviationSummary";
import { LandSummary } from "./LandSummary";
import { MaritimeSummary } from "./MaritimeSummary";

interface UseSummaryPanelProps {
  use: IUse;
  titlePrefix: string;
}

export const UseSummaryPanel: FunctionComponent<UseSummaryPanelProps> = ({
  use,
  titlePrefix,
}: UseSummaryPanelProps): JSX.Element => {
  const title = getCardHeaderTitle(titlePrefix, use);
  const useSummary = getUseSummary(use);

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
    use.activity === Activities.Other
      ? use.otherActivity?.toUpperCase()
      : use.activity.replace(/_/, " ");

  if (use.purpose) {
    title += ` (${use.purpose})`;
  }

  return title;
};

const getUseSummary = (use: IUse): ReactNode => {
  switch (use.environment) {
    case Environments.Maritime:
      return getMaritimeSummary(use);

    case Environments.Aviation:
      return getAviationSummary(use);

    case Environments.Land:
      return getLandSummary(use);
  }
};

const getMaritimeSummary = (use: IUse): ReactNode => (
  <MaritimeSummary use={use} />
);

const getAviationSummary = (use: IUse): ReactNode => (
  <AviationSummary use={use} />
);

const getLandSummary = (use: IUse): ReactNode => <LandSummary use={use} />;
