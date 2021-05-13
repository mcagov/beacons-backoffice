import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Environments, IUse } from "entities/IUse";
import React, { FunctionComponent, ReactNode } from "react";
import { formatUse } from "utils/writingStyle";
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
  return (
    <Card>
      <CardContent>
        <CardHeader title={cardHeaderTitle(titlePrefix, use)} />
        {useSummary(use)}
      </CardContent>
    </Card>
  );
};

const cardHeaderTitle = (titlePrefix: string, use: IUse): string => {
  const usePrefix = `${titlePrefix} use: `;
  const useOverview = formatUse(use).toUpperCase();

  return usePrefix + useOverview;
};

const useSummary = (use: IUse): ReactNode => {
  switch (use.environment) {
    case Environments.Maritime:
      return <MaritimeSummary use={use} />;

    case Environments.Aviation:
      return <AviationSummary use={use} />;

    case Environments.Land:
      return <LandSummary use={use} />;
  }
};
