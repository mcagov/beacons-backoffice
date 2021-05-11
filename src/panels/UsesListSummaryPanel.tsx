import { Card, CardContent, CardHeader } from "@material-ui/core";
import { IUse } from "entities/IUse";
import { IUsesGateway } from "gateways/IUsesGateway";
import { FunctionComponent, useEffect, useState } from "react";

interface UsesListSummaryPanelProps {
  usesGateway: IUsesGateway;
  beaconId: string;
}

export const UsesListSummaryPanel: FunctionComponent<UsesListSummaryPanelProps> = ({
  usesGateway,
  beaconId,
}: UsesListSummaryPanelProps): JSX.Element => {
  const [uses, setUses] = useState<IUse[]>();

  useEffect((): (() => void) => {
    let isMounted = true;
    const fetchBeacon = async (id: string) => {
      try {
        const uses = await usesGateway.getUses(id);

        if (isMounted) {
          setUses(uses);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeacon(beaconId);

    return () => {
      isMounted = false;
    };
  }, [beaconId, usesGateway]);

  return (
    <Card>
      <CardContent>
        <CardHeader title="Primary use" />
      </CardContent>
    </Card>
  );
};
