import { Card, CardContent, CardHeader } from "@material-ui/core";
import { PanelViewState } from "components/dataPanel/PanelViewState";
import React from "react";

export const OwnerSummaryPanel = () => {
  const fields = [
    { key: "Name", value: "John Smith" },
    { key: "Telephone", value: ["077133812665", "077133812667"] },
    { key: "Email", value: "matt.carr@madetech.com" },
    { key: "Address", value: ["10 Grove Road", "Bristol", "BS11 8BG"] },
  ];
  return (
    <Card>
      <CardContent>
        <CardHeader title="Owner" />
        <PanelViewState fields={fields} />
      </CardContent>
    </Card>
  );
};
