import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beaconFixture } from "../../fixtures/beacons.fixture";
import { IBeaconsGateway } from "../../gateways/IBeaconsGateway";
import { Placeholders } from "../../useCases/mcaWritingStyleFormatter";
import { BeaconSummaryPanel } from "./BeaconSummaryPanel";

describe("BeaconSummaryPanel", () => {
  let beaconsGatewayDouble: IBeaconsGateway;

  beforeEach(() => {
    beaconsGatewayDouble = {
      getBeacon: jest.fn().mockResolvedValue(beaconFixture),
      getAllBeacons: jest.fn(),
      updateBeacon: jest.fn(),
    };
  });

  it("calls the injected BeaconsGateway", async () => {
    render(
      <BeaconSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    await waitFor(() => {
      expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalled();
    });
  });

  it("retrieves the beacon summary data by beacon id", async () => {
    render(
      <BeaconSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    expect(
      await screen.findByText(beaconFixture.protocolCode as string)
    ).toBeVisible();
  });

  it("displays an error if beacon lookup fails for any reason", async () => {
    beaconsGatewayDouble.getBeacon = jest.fn().mockImplementation(() => {
      throw Error();
    });
    jest.spyOn(console, "error").mockImplementation(() => {}); // Avoid console error failing test
    render(
      <BeaconSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={"doesn't exist"}
      />
    );

    expect(await screen.findByRole("alert")).toBeVisible();
    expect(
      await screen.findByText(Placeholders.UnspecifiedError)
    ).toBeVisible();
  });

  it("displays undefined fields as 'NO DATA ENTERED'", async () => {
    const beaconWithUndefinedField = {
      ...beaconFixture,
      protocolCode: undefined,
    };
    beaconsGatewayDouble.getBeacon = jest
      .fn()
      .mockResolvedValue(beaconWithUndefinedField);

    render(
      <BeaconSummaryPanel
        beaconsGateway={beaconsGatewayDouble}
        beaconId={beaconFixture.id}
      />
    );

    expect(await screen.findByText(Placeholders.NoData)).toBeVisible();
  });

  describe("When editing", () => {
    it("allows user to edit basic string input fields", async () => {
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={beaconFixture.id}
        />
      );
      const editButton = await screen.findByText(/edit summary/i);

      userEvent.click(editButton);

      expect(
        await screen.findByDisplayValue(beaconFixture.manufacturer as string)
      ).toBeVisible();
      expect(
        await screen.findByDisplayValue(beaconFixture.model as string)
      ).toBeVisible();
      expect(
        await screen.findByDisplayValue(beaconFixture.type as string)
      ).toBeVisible();
      expect(
        await screen.findByDisplayValue(
          beaconFixture.manufacturerSerialNumber as string
        )
      ).toBeVisible();
      expect(
        await screen.findByDisplayValue(beaconFixture.chkCode as string)
      ).toBeVisible();
    });

    it("user can type text in basic string input fields", async () => {
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={beaconFixture.id}
        />
      );
      const editButton = await screen.findByText(/edit summary/i);
      userEvent.click(editButton);
      const editableField = await screen.findByDisplayValue(
        beaconFixture.manufacturer as string
      );

      userEvent.clear(editableField);
      userEvent.type(editableField, "ACME Inc.");

      expect(await screen.findByDisplayValue("ACME Inc.")).toBeVisible();
    });

    it("allows user to edit fields for which the current value is undefined", async () => {
      const beaconFixtureWithUndefinedField = {
        ...beaconFixture,
        chkCode: undefined,
      };
      beaconsGatewayDouble.getBeacon = jest
        .fn()
        .mockResolvedValue(beaconFixtureWithUndefinedField);
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={beaconFixture.id}
        />
      );
      const editButton = await screen.findByText(/edit summary/i);
      userEvent.click(editButton);
      const fieldWithUndefinedValue = await screen.findByPlaceholderText(
        Placeholders.NoData
      );

      userEvent.type(fieldWithUndefinedValue, "A valid CHK code");

      expect(await screen.findByDisplayValue("A valid CHK code")).toBeVisible();
    });

    it("allows user to edit date fields", async () => {
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={beaconFixture.id}
        />
      );
      const editButton = await screen.findByText(/edit summary/i);
      userEvent.click(editButton);

      // Use findByLabelText rather than findByDisplayValue because date display format is likely to be brittle
      expect(
        await screen.findByLabelText(/battery expiry date/i)
      ).toBeVisible();
    });

    it("calls the BeaconGateway object correctly to save edits", async () => {
      const editedBeaconFixture = {
        ...beaconFixture,
        manufacturer: "ACME Inc.",
      };
      beaconsGatewayDouble.updateBeacon = jest.fn().mockResolvedValue(true);
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={beaconFixture.id}
        />
      );
      const editButton = await screen.findByText(/edit summary/i);
      userEvent.click(editButton);
      const editableField = await screen.findByDisplayValue(
        beaconFixture.manufacturer as string
      );
      userEvent.clear(editableField);
      userEvent.type(editableField, "ACME Inc.");
      const saveButton = screen.getByRole("button", { name: "Save" });

      userEvent.click(saveButton);

      await waitFor(() => {
        expect(beaconsGatewayDouble.updateBeacon).toHaveBeenCalledWith(
          editedBeaconFixture.id,
          editedBeaconFixture
        );
      });
    });

    it("fetches beacon data on state change", async () => {
      render(
        <BeaconSummaryPanel
          beaconsGateway={beaconsGatewayDouble}
          beaconId={beaconFixture.id}
        />
      );
      const editButton = await screen.findByText(/edit summary/i);
      userEvent.click(editButton);
      const cancelButton = await screen.findByRole("button", {
        name: "Cancel",
      });
      userEvent.click(cancelButton);

      expect(beaconsGatewayDouble.getBeacon).toHaveBeenCalledTimes(3);
    });
  });
});
