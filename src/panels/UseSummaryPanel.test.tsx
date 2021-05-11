import { render, screen } from "@testing-library/react";
import { Activity, Purposes } from "entities/IUse";
import React from "react";
import { UseSummaryPanel } from "./UseSummaryPanel";

describe("UseSummaryPanel", () => {
  let use: any;

  beforeEach(() => {
    use = {
      activity: Activity.SailingVessel,
      purpose: Purposes.Pleasure,
    };
  });

  it("should render the use with an underscore in the activity along with the title", async () => {
    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(await screen.findByText("Primary use: SAILING VESSEL (PLEASURE)"));
  });

  it("should render the use without an underscore in the activity along with the title", async () => {
    use.activity = Activity.Glider;
    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(await screen.findByText("Primary use: GLIDER (PLEASURE)"));
  });
});
