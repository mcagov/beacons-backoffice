import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders beacon records link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Beacon records/i);
  expect(linkElement).toBeInTheDocument();
});
