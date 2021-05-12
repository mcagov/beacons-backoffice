import { render, screen } from "@testing-library/react";
import { Activities, IUse, Purposes } from "entities/IUse";
import React from "react";
import { UseSummaryPanel } from "./UseSummaryPanel";

describe("UseSummaryPanel", () => {
  it("should render the use with an underscore in the activity along with the title", async () => {
    const use: IUse = {
      activity: Activities.SailingVessel,
      purpose: Purposes.Pleasure,
    } as IUse;
    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(
      await screen.findByText("Primary use: SAILING VESSEL (PLEASURE)")
    ).toBeVisible();
  });

  it("should render the use without an underscore in the activity along with the title", async () => {
    const use: IUse = {
      activity: Activities.Glider,
      purpose: Purposes.Pleasure,
    } as IUse;
    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(
      await screen.findByText("Primary use: GLIDER (PLEASURE)")
    ).toBeVisible();
  });

  it("should render an other activity use", async () => {
    const use: IUse = {
      activity: Activities.Other,
      purpose: Purposes.Pleasure,
      otherActivity: "Gliding in the sea",
    } as IUse;

    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(
      await screen.findByText("Primary use: GLIDING IN THE SEA (PLEASURE)")
    ).toBeVisible();
  });
});
