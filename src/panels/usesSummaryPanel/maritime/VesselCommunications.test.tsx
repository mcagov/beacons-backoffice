import { render, screen } from "@testing-library/react";
import React from "react";
import { VesselCommunications } from "./VesselCommunications";

describe("Vessel Communications", () => {
  it("should render the vessel communications for all fields that are defined", async () => {
    const use: any = {
      callSign: "Call me",
      vhfRadio: true,
      fixedVhfRadio: true,
      fixedVhfRadioValue: "My MMSI number",
      portableVhfRadio: true,
      portableVhfRadioValue: "2359",
      satelliteTelephone: true,
      satelliteTelephoneValue: "+8707",
      mobileTelephone: true,
      mobileTelephone1: "07713812667",
      mobileTelephone2: "07713812668",
    };

    render(<VesselCommunications use={use} />);

    expect(await screen.findByText("Communication type 1:")).toBeVisible();
    expect(await screen.findByText("VHF RADIO")).toBeVisible();
    expect(await screen.findByText("FIXED VHF/DSC")).toBeVisible();
    expect(await screen.findByText("Communication type 2:")).toBeVisible();
    expect(await screen.findByText("MY MMSI NUMBER")).toBeVisible();
    expect(await screen.findByText("Communication type 3:")).toBeVisible();
    expect(await screen.findByText("PORTABLE VHF/DSC")).toBeVisible();
    expect(await screen.findByText("Communication type 4:")).toBeVisible();
    expect(await screen.findByText("+8707")).toBeVisible();
    expect(await screen.findByText("Communication type 5:")).toBeVisible();
    expect(await screen.findByText("07713812667")).toBeVisible();
    expect(await screen.findByText("07713812668")).toBeVisible();
  });
});
