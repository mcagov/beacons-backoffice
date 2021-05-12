import { render, screen } from "@testing-library/react";
import { Activities } from "entities/IUse";
import React from "react";
import { LandSummary } from "./LandSummary";

describe("Land Summary", () => {
  it("should display the summary for a land use of working remotely", async () => {
    const use: any = {
      activity: Activities.WorkingRemotely,
      workingRemotelyLocation: "In bristol hiking",
      workingRemotelyPeopleCount: 5,
    };

    render(<LandSummary use={use} />);

    expect(await screen.findByText("IN BRISTOL HIKING"));
    expect(await screen.findByText("5"));
  });

  it("should display the summary for a land use of working on a windfarm", async () => {
    const use: any = {
      activity: Activities.Windfarm,
      windfarmLocation: "In Scotland",
      windfarmPeopleCount: 5,
    };

    render(<LandSummary use={use} />);

    expect(await screen.findByText("IN SCOTLAND")).toBeVisible();
    expect(await screen.findByText("5")).toBeVisible();
  });

  it("should display the summary for a land use of other", async () => {
    const use: any = {
      activity: Activities.Other,
      otherActivity: "Jogging",
      otherActivityLocation: "In the mountains",
      otherActivityPeopleCount: 2,
    };

    render(<LandSummary use={use} />);

    expect(await screen.findByText("JOGGING")).toBeVisible();
    expect(await screen.findByText("IN THE MOUNTAINS")).toBeVisible();
    expect(await screen.findByText("2")).toBeVisible();
  });
});
