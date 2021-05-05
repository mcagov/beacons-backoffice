import { render, screen } from "@testing-library/react";
import { OwnerSummaryPanel } from "./OwnerSummaryPanel";

describe("Owner Summary Panel", () => {
  it("should display the owners details", async () => {
    render(<OwnerSummaryPanel />);

    expect(await screen.findByText(/John Smith/i)).toBeInTheDocument();
  });
});
