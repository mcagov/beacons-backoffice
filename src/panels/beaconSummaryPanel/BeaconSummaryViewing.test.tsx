import { render, screen } from "@testing-library/react";
import { beaconFixture } from "../../fixtures/beacons.fixture";
import { Placeholders } from "../../utils/writingStyle";
import { BeaconSummaryViewing } from "./BeaconSummaryViewing";

describe("BeaconSummaryViewing", () => {
  it("displays undefined fields as 'NO DATA ENTERED'", async () => {
    const beaconWithUndefinedField = {
      ...beaconFixture,
      protocolCode: undefined,
    };

    render(<BeaconSummaryViewing beacon={beaconWithUndefinedField} />);

    expect(await screen.findByText(Placeholders.NoData)).toBeVisible();
  });
});
