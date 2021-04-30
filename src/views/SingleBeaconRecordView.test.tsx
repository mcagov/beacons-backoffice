import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { SingleBeaconRecordView } from "./SingleBeaconRecordView";

describe("Beacon record page", () => {
  it("Displays correct Tab panel", () => {
    render(<SingleBeaconRecordView />);

    const leftClick = { button: 1 };

    expect(screen.getByText("Hello I am owner of boat")).toBeDefined();
    expect(screen.queryByText("Hello I am beacon use")).toBeNull();

    fireEvent.click(
      screen.getByText("Registered Uses", { exact: false }),
      leftClick
    );

    expect(screen.getByText("Hello I am beacon use")).toBeDefined();
    expect(screen.queryByText("Hello I am owner of boat")).toBeNull();
  });
});
