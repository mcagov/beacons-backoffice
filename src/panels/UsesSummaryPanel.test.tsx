import { render, screen } from "@testing-library/react";
import { usesFixture } from "fixtures/uses.fixture";
import React from "react";
import { UsesSummaryPanel } from "./UsesSummaryPanel";

describe("Uses Summary Panel", () => {
  it("should display the owners details", async () => {
    render(<UsesSummaryPanel uses={usesFixture} />);

    expect(await screen.findByText(/Primary Use/i)).toBeVisible();
  });
});
