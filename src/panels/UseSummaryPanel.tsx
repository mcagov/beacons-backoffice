import { Card, CardContent, CardHeader } from "@material-ui/core";
import { IUse } from "entities/IUse";
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

  return (
    <Card>
      <CardContent>
        <CardHeader title={title} />
      </CardContent>
    </Card>
  );
};

const getCardHeaderTitle = (titlePrefix: string, use: IUse): string => {
  let title = `${titlePrefix} use: ${use.activity.replace(/_/, " ")} `;
  if (use.purpose) {
    title += `(${use.purpose})`;
  }

  return title;
};
