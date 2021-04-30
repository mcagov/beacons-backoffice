import { render, screen } from "@testing-library/react";
import { Style } from "../../useCases/mcaWritingStyleFormatter";
import { ViewPanel } from "./ViewPanel";

describe("ViewPanel", () => {
  it("renders empty with no data", () => {
    render(<ViewPanel fields={[]} />);

    expect(screen.queryByRole("row")).toBeNull();
  });

  it("renders one field", () => {
    const fields = [
      {
        key: "Manufacturer",
        value: "Ocean Signal",
      },
    ];

    render(<ViewPanel fields={fields} />);

    expect(screen.getByText("Manufacturer:")).toBeVisible();
    expect(screen.getByText("Ocean Signal")).toBeVisible();
  });

  it("renders two fields", () => {
    const fields = [
      {
        key: "Manufacturer",
        value: "Ocean Signal",
      },
      {
        key: "Model",
        value: "Excelsior EPIRB",
      },
    ];

    render(<ViewPanel fields={fields} />);

    expect(screen.getByText("Manufacturer:")).toBeVisible();
    expect(screen.getByText("Ocean Signal")).toBeVisible();
    expect(screen.getByText("Model:")).toBeVisible();
    expect(screen.getByText("Excelsior EPIRB")).toBeVisible();
  });

  it("renders undefined fields", () => {
    const fields = [
      {
        key: "CHK Code",
        value: undefined,
      },
    ];

    render(<ViewPanel fields={fields} />);

    expect(screen.getByText("CHK Code:")).toBeVisible();
    expect(screen.getByText(Style.NoData)).toBeVisible();
  });

  it("can split into two even columns", () => {
    const fields = [
      {
        key: "Manufacturer",
        value: "Ocean Signal",
      },
      {
        key: "Model",
        value: "Excelsior EPIRB",
      },
      {
        key: "CHK Code",
        value: undefined,
      },
      {
        key: "Type",
        value: "EPIRB",
      },
    ];

    render(<ViewPanel fields={fields} columns={2} />);

    expect(screen.getAllByRole("table")).toHaveLength(2);
  });

  it("can split into two columns when there are an odd number of fields", () => {
    const fields = [
      {
        key: "Manufacturer",
        value: "Ocean Signal",
      },
      {
        key: "Model",
        value: "Excelsior EPIRB",
      },
      {
        key: "CHK Code",
        value: undefined,
      },
      {
        key: "Type",
        value: "EPIRB",
      },
      {
        key: "Hex ID",
        value: "1D0...",
      },
    ];

    render(<ViewPanel fields={fields} columns={2} />);

    expect(screen.getAllByRole("table")).toHaveLength(2);
  });

  it("can split into two columns on a given index", () => {
    const fields = [
      {
        key: "Manufacturer",
        value: "Ocean Signal",
      },
      {
        key: "Model",
        value: "Excelsior EPIRB",
      },
      {
        key: "CHK Code",
        value: undefined,
      },
      {
        key: "Type",
        value: "EPIRB",
      },
      {
        key: "Hex ID",
        value: "1D0...",
      },
    ];

    render(<ViewPanel fields={fields} columns={2} splitAfter={1} />);

    expect(screen.getAllByRole("table")).toHaveLength(2);
  });
});
