import { fireEvent, screen, render } from "@testing-library/react";
import { Beacon } from "./Beacon";
import React from "react";

describe("Beacon record page", () => {
  it("Displays correct Tab panel", () => {
    render(<Beacon />);

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
