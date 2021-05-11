import { render, screen } from "@testing-library/react";
import React from "react";
import { MoreDetails } from "./MoreDetails";

describe("More Details Component", () => {
  it("should render the more details", async () => {
    const use: any = { moreDetails: "Yellow bike, red helmet" };
    render(<MoreDetails use={use} />);

    expect(await screen.findByText("YELLOW BIKE, RED HELMET")).toBeVisible();
  });
});
