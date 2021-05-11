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

    expect(
      await screen.findByText("Primary use: SAILING VESSEL (PLEASURE)")
    ).toBeVisible();
  });

  it("should render the use without an underscore in the activity along with the title", async () => {
    use.activity = Activity.Glider;
    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(
      await screen.findByText("Primary use: GLIDER (PLEASURE)")
    ).toBeVisible();
  });

  it("should render an other activity use", async () => {
    use.activity = Activity.Other;
    use.otherActivity = "Gliding in the sea";

    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(
      await screen.findByText("Primary use: GLIDING IN THE SEA (PLEASURE)")
    ).toBeVisible();
  });

  it("should render a use for maritime use", async () => {
    use.maxCapacity = 10;
    use.vesselName = "Homeland";
    use.beaconLocation = "In my carry bag";
    use.portLetterNumber = "XYZ123";
    use.homeport = "Newport";
    use.areaOfOperation = "Whitesands Bay";
    use.imoNumber = "IMO123";
    use.ssrNumber = "SSR 123456";
    use.rssNumber = "A12345";
    use.officialNumber = "Fish and Ships";
    use.rigPlatformLocation = "Scotland";

    render(<UseSummaryPanel use={use} titlePrefix="Primary" />);

    expect(await screen.findByText("10")).toBeVisible();
    expect(await screen.findByText("HOMELAND")).toBeVisible();
    expect(await screen.findByText("IN MY CARRY BAG")).toBeVisible();
    expect(await screen.findByText("XYZ123")).toBeVisible();
    expect(await screen.findByText("NEWPORT")).toBeVisible();
    expect(await screen.findByText("WHITESANDS BAY")).toBeVisible();
    expect(await screen.findByText("IMO123")).toBeVisible();
    expect(await screen.findByText("SSR 123456")).toBeVisible();
    expect(await screen.findByText("A12345")).toBeVisible();
    expect(await screen.findByText("FISH AND SHIPS")).toBeVisible();
    expect(await screen.findByText("SCOTLAND")).toBeVisible();
  });
});
