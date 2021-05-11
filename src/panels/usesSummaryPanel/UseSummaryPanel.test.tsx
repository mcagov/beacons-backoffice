import { render, screen } from "@testing-library/react";
import { Activities, Purposes } from "entities/IUse";
import React from "react";
import { UseSummaryPanel } from "./UseSummaryPanel";

describe("UseSummaryPanel", () => {
  let use: any;

  beforeEach(() => {
    use = {
      activity: Activities.SailingVessel,
      purpose: Purposes.Pleasure,
    };
  });

  it("should render the use with an underscore in the activity along with the title", async () => {
    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(
      await screen.findByText("Primary use: SAILING VESSEL (PLEASURE)")
    ).toBeVisible();
  });

  it("should render the use without an underscore in the activity along with the title", async () => {
    use.activity = Activities.Glider;
    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(
      await screen.findByText("Primary use: GLIDER (PLEASURE)")
    ).toBeVisible();
  });

  it("should render an other activity use", async () => {
    use.activity = Activities.Other;
    use.otherActivity = "Gliding in the sea";

    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(
      await screen.findByText("Primary use: GLIDING IN THE SEA (PLEASURE)")
    ).toBeVisible();
  });
});
