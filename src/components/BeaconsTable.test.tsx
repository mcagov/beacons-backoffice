import { render, screen, waitFor } from "@testing-library/react";
import { BeaconsTable } from "./BeaconsTable";
import { IUseCase } from "../useCases/GetBeaconsInTableFormat";

describe("<BeaconsTable>", () => {
  let getBeaconsInTableFormatDouble: IUseCase;

  beforeEach(() => {
    getBeaconsInTableFormatDouble = {
      execute: jest.fn().mockResolvedValue([
        {
          date: "1 Feb 20",
          hexId: "Hex me difficultly",
          id: "97b306aa-cbd0-4f09-aa24-2d876b983efb",
          owner: "Vice-Admiral Horatio Nelson, 1st Viscount Nelson",
          status: "New",
          uses: "Sailing",
        },
        {
          date: "9 Aug 20",
          hexId: "Hex not difficultly",
          id: "97b306aa-cbd0-4f09-aa24-2d876b983efc",
          owner: "Vice-Admiral Horatio Nelson, 2st Viscount Nelson",
          status: "New",
          uses: "Surfing",
        },
      ]),
    };
  });

  it("renders a table", async () => {
    render(
      <BeaconsTable getBeaconsInTableFormat={getBeaconsInTableFormatDouble} />
    );

    expect((await screen.findAllByRole("table")).length).toBeGreaterThan(0);
  });

  it("queries the injected gateway for beacon data", async () => {
    render(
      <BeaconsTable getBeaconsInTableFormat={getBeaconsInTableFormatDouble} />
    );

    await waitFor(() => {
      expect(getBeaconsInTableFormatDouble.execute).toHaveBeenCalled();
    });
  });

  it("displays the returned beacon data in the table", async () => {
    render(
      <BeaconsTable getBeaconsInTableFormat={getBeaconsInTableFormatDouble} />
    );

    expect(await screen.findByText("Hex me difficultly")).toBeVisible();
  });

  it("displays 2 rows when 2 beacons are given", async () => {
    render(
      <BeaconsTable getBeaconsInTableFormat={getBeaconsInTableFormatDouble} />
    );

    expect(await screen.findAllByTestId("beacons-table-row")).toHaveLength(2);
  });

  it("can click on the hex ID to see more details about the beacon", async () => {
    render(
      <BeaconsTable getBeaconsInTableFormat={getBeaconsInTableFormatDouble} />
    );

    const hexIdField = await screen.findByText("Hex me difficultly");

    expect(hexIdField.getAttribute("href")).toBe(
      "/beacons/97b306aa-cbd0-4f09-aa24-2d876b983efb"
    );
  });
});
