import { render, screen } from "@testing-library/react";
import React from "react";
import { Placeholders } from "useCases/mcaWritingStyleFormatter";
import { AircraftSummary } from "./AircraftSummary";

describe("Aircraft Summary", () => {
  it("should render the aircraft summary", async () => {
    const use: any = {
      maxCapacity: 10,
      aircraftManufacturer: "Boeing",
      principalAirport: "Bristol",
      secondaryAirport: "Newport",
      registrationMark: "G-AAAA",
      hexAddress: "AC82EC",
      cnOrMsnNumber: "M-ZYXW",
      dongle: true,
      beaconPosition: "Stowed inside the nose of the aircraft",
    };
    render(<AircraftSummary use={use} />);

    expect(await screen.findByText("10")).toBeVisible();
    expect(await screen.findByText("BOEING")).toBeVisible();
    expect(await screen.findByText("BRISTOL")).toBeVisible();
    expect(await screen.findByText("NEWPORT")).toBeVisible();
    expect(await screen.findByText("G-AAAA")).toBeVisible();
    expect(await screen.findByText("AC82EC")).toBeVisible();
    expect(await screen.findByText("M-ZYXW")).toBeVisible();
    expect(await screen.findByText("YES")).toBeVisible();
    expect(
      await screen.findByText("STOWED INSIDE THE NOSE OF THE AIRCRAFT")
    ).toBeVisible();
  });

  it("should render the no data placeholder for fields not submitted", async () => {
    const use: any = {
      dongle: false,
    };
    render(<AircraftSummary use={use} />);

    expect(await (await screen.findAllByText(Placeholders.NoData)).length).toBe(
      8
    );
    expect(await screen.findByText("NO")).toBeVisible();
  });
});
