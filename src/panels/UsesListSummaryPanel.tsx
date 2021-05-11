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
    <>
      {uses.map((use, index) => (
        <UseSummaryPanel
          key={index}
          use={use}
          titlePrefix={getTitlePrefix(index + 1)}
        />
      ))}
    </>
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
