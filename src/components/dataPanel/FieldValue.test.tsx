import { render, screen } from "@testing-library/react";
import { FieldValue } from "./FieldValue";

describe("FieldValue", () => {
  it("renders undefined values as 'NO DATA ENTERED'", () => {
    render(<FieldValue>{undefined}</FieldValue>);

    expect(screen.getByText("NO DATA ENTERED")).toBeVisible();
  });

  it("renders string values in bold", () => {
    render(<FieldValue>Actual beacon data field</FieldValue>);

    expect(screen.getByText("Actual beacon data field")).toHaveStyle(
      "font-weight: bold"
    );
  });
});
