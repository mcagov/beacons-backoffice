import { render, screen } from "@testing-library/react";
import { EmergencyContactSummaryPanel } from "./EmergencyContactSummaryPanel";

describe("Emergency Contact Summary Panel", () => {
  it("should display the emergency contact details", async () => {
    render(<EmergencyContactSummaryPanel />);

    expect(await screen.findByText(/Chesous the saviour/i)).toBeInTheDocument();
  });

  it("should change the index of the emergency contact", async () => {
    render(<EmergencyContactSummaryPanel />);

    expect(await screen.findByText(/Emergency Contact 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Emergency Contact 2/i)).toBeInTheDocument();
  });
});
