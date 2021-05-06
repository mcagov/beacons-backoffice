import { Card, CardContent, CardHeader } from "@material-ui/core";
import { IUse } from "entities/IUse";
import { FunctionComponent } from "react";

interface UsesSummaryPanelProps {
  uses: IUse[];
}

export const UsesSummaryPanel: FunctionComponent<UsesSummaryPanelProps> = ({
  uses,
}: UsesSummaryPanelProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <CardHeader title="Primary use" />
      </CardContent>
    </Card>
  );
};
