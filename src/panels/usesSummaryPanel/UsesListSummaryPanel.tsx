import { Grid } from "@material-ui/core";
import { IUse } from "entities/IUse";
import { IUsesGateway } from "gateways/IUsesGateway";
import React, { FunctionComponent, useEffect, useState } from "react";
import { UseSummaryPanel } from "./UseSummaryPanel";

interface UsesListSummaryPanelProps {
  usesGateway: IUsesGateway;
  beaconId: string;
}

export const UsesListSummaryPanel: FunctionComponent<UsesListSummaryPanelProps> = ({
  usesGateway,
  beaconId,
}: UsesListSummaryPanelProps): JSX.Element => {
  const [uses, setUses] = useState<IUse[]>([]);

  useEffect((): void => {
    const fetchUses = async (id: string) => {
      try {
        const uses = await usesGateway.getUses(id);
        setUses(uses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUses(beaconId);
  }, [beaconId, usesGateway]);

  return (
    <Grid container spacing={2}>
      {uses.map((use, index) => (
        <Grid item xs={6} key={index}>
          <UseSummaryPanel use={use} titlePrefix={getTitlePrefix(index + 1)} />
        </Grid>
      ))}
    </Grid>
  );
};

const getTitlePrefix = (index: number): string => {
  const numberToOrdinalString: Record<number, string> = {
    1: "Primary",
    2: "Secondary",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
  };

  return numberToOrdinalString[index];
};
