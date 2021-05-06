import { render, screen } from "@testing-library/react";
import { Placeholders } from "../../useCases/mcaWritingStyleFormatter";
import { IField } from "./IField";
import { PanelViewingState } from "./PanelViewingState";

describe("PanelViewingState", () => {
  it("renders empty with no data", () => {
    render(<PanelViewingState fields={[]} />);

    expect(screen.queryByRole("row")).toBeNull();
  });

  it("renders one field", () => {
    const fields: IField[] = [
      {
        key: "manufacturer",
        displayKey: "Manufacturer",
        value: "Ocean Signal",
      },
    ];

    render(<PanelViewingState fields={fields} />);

    expect(screen.getByText("Manufacturer:")).toBeVisible();
    expect(screen.getByText(/Ocean Signal/i)).toBeVisible();
  });

  it("renders two fields", () => {
    const fields: IField[] = [
      {
        key: "manufacturer",
        displayKey: "Manufacturer",
        value: "Ocean Signal",
      },
      {
        key: "model",
        displayKey: "Model",
        value: "Excelsior EPIRB",
      },
    ];

    render(<PanelViewingState fields={fields} />);

    expect(screen.getByText("Manufacturer:")).toBeVisible();
    expect(screen.getByText(/Ocean Signal/i)).toBeVisible();
    expect(screen.getByText("Model:")).toBeVisible();
    expect(screen.getByText(/Excelsior EPIRB/i)).toBeVisible();
  });

  it("renders undefined fields", () => {
    const fields: IField[] = [
      {
        key: "chkCode",
        displayKey: "CHK Code",
        value: undefined,
      },
    ];

    render(<PanelViewingState fields={fields} />);

    expect(screen.getByText("CHK Code:")).toBeVisible();
    expect(screen.getByText(Placeholders.NoData)).toBeVisible();
  });

  it("can split into two even columns", () => {
    const fields: IField[] = [
      {
        key: "manufacter",
        displayKey: "Manufacturer",
        value: "Ocean Signal",
      },
      {
        key: "model",
        displayKey: "Model",
        value: "Excelsior EPIRB",
      },
      {
        key: "chkCode",
        displayKey: "CHK Code",
        value: undefined,
      },
      {
        key: "type",
        displayKey: "Type",
        value: "EPIRB",
      },
    ];

    render(<PanelViewingState fields={fields} columns={2} />);

    expect(screen.getAllByRole("table")).toHaveLength(2);
  });

  it("can split into two columns when there are an odd number of fields", () => {
    const fields: IField[] = [
      {
        key: "manufacturer",
        displayKey: "Manufacturer",
        value: "Ocean Signal",
      },
      {
        key: "model",
        displayKey: "Model",
        value: "Excelsior EPIRB",
      },
      {
        key: "chkCode",
        displayKey: "CHK Code",
        value: undefined,
      },
      {
        key: "type",
        displayKey: "Type",
        value: "EPIRB",
      },
      {
        key: "hexId",
        displayKey: "Hex ID",
        value: "1D0...",
      },
    ];

    render(<PanelViewingState fields={fields} columns={2} />);

    expect(screen.getAllByRole("table")).toHaveLength(2);
  });

  it("can split into two columns on a given index", () => {
    const fields: IField[] = [
      {
        key: "manufacturer",
        displayKey: "Manufacturer",
        value: "Ocean Signal",
      },
      {
        key: "model",
        displayKey: "Model",
        value: "Excelsior EPIRB",
      },
      {
        key: "chkCode",
        displayKey: "CHK Code",
        value: undefined,
      },
      {
        key: "type",
        displayKey: "Type",
        value: "EPIRB",
      },
      {
        key: "hexId",
        displayKey: "Hex ID",
        value: "1D0...",
      },
    ];

    render(<PanelViewingState fields={fields} columns={2} splitAfter={1} />);

    expect(screen.getAllByRole("table")).toHaveLength(2);
  });
});
