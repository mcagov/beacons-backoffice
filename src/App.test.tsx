import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders overview link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Overview/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders beacon records link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Beacon records/i);
  expect(linkElement).toBeInTheDocument();
});
