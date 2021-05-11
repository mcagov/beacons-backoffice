import { render, screen } from "@testing-library/react";
import { usesFixture } from "fixtures/uses.fixture";
import { IUsesGateway } from "gateways/IUsesGateway";
import React from "react";
import { UsesListSummaryPanel } from "./UsesListSummaryPanel";

describe("Uses List Summary Panel", () => {
  let gateway: IUsesGateway;
  let beaconId: string;

  beforeEach(() => {
    gateway = {
      getUses: jest.fn().mockResolvedValue(usesFixture),
    };
    beaconId = "1";
  });

  it("should display the owners details", async () => {
    render(<UsesListSummaryPanel usesGateway={gateway} beaconId={beaconId} />);

    expect(await screen.findByText(/Primary Use/i)).toBeVisible();
  });
});
