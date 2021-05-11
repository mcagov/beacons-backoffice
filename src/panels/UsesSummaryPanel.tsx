import { Card, CardContent, CardHeader } from "@material-ui/core";
import { IUsesGateway } from "gateways/IUsesGateway";
import { FunctionComponent } from "react";

interface UsesSummaryPanelProps {
  usesGateway: IUsesGateway;
  beaconId: string;
}

export const UsesSummaryPanel: FunctionComponent<UsesSummaryPanelProps> = ({
  usesGateway,
  beaconId,
}: UsesSummaryPanelProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <CardHeader title="Primary use" />
      </CardContent>
    </Card>
  );
};
