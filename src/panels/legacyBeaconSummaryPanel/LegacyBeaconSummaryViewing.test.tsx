import { render, screen } from "@testing-library/react";
import { legacyBeaconFixture } from "../../fixtures/legacybeacons.fixture";
import { Placeholders } from "../../utils/writingStyle";
import { LegacyBeaconSummaryViewing } from "./LegacyBeaconSummaryViewing";

describe("LegacyBeaconSummaryViewing", () => {
  it("displays fields with blank string as the 'no data' placeholder", async () => {
    render(<LegacyBeaconSummaryViewing legacyBeacon={legacyBeaconFixture} />);

    expect(await screen.findByText(Placeholders.NoData)).toBeVisible();
  });
});
