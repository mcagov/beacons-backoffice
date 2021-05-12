import { render, screen } from "@testing-library/react";
import React from "react";
import { AviationSummary } from "./AviationSummary";

describe("Aviation Summary", () => {
  it("should display the aircraft summary", async () => {
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
    render(<AviationSummary use={use} />);

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

  it("should display NO if the beacon is not a dongle", async () => {
    const use: any = {
      dongle: false,
    };
    render(<AviationSummary use={use} />);

    expect(await screen.findByText("NO")).toBeVisible();
  });

  it("should display the aircraft communications", async () => {
    const use: any = {
      vhfRadio: true,
      satelliteTelephone: true,
      satelliteTelephoneValue: "+8707",
      mobileTelephone: true,
      mobileTelephone1: "07713812667",
      mobileTelephone2: "07713812668",
      otherCommunication: true,
      otherCommunicationValue: "You can contact me via my partner",
    };
  });
});
