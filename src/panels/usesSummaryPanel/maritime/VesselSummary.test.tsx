import { render, screen } from "@testing-library/react";
import React from "react";
import { VesselSummary } from "./VesselSummary";

describe("Vessel Summary", () => {
  it("should render the vessel summary information", async () => {
    const use: any = {
      maxCapacity: 10,
      vesselName: "Homeland",
      beaconLocation: "In my carry bag",
      portLetterNumber: "XYZ123",
      homeport: "Newport",
      areaOfOperation: "Whitesands Bay",
      imoNumber: "IMO123",
      ssrNumber: "SSR 123456",
      rssNumber: "A12345",
      officialNumber: "Fish and Ships",
      rigPlatformLocation: "Scotland",
    };
    render(<VesselSummary use={use} />);

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
