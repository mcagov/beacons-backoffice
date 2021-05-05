import { Card, CardContent, CardHeader } from "@material-ui/core";
import { PanelViewState } from "components/dataPanel/PanelViewState";
import React from "react";

export const EmergencyContactSummaryPanel = () => {
  const fields = [
    [
      { key: "Name", value: "Chesous the saviour" },
      { key: "Telephone", value: ["076533812665", "071133812667"] },
    ],
    [
      { key: "Name", value: "Shiela the many" },
      { key: "Telephone", value: ["077133812615", "079133812667"] },
    ],
  ];
  return (
    <>
      {fields.map((field, index) => (
        <Card key={index}>
          <CardContent>
            <CardHeader title={`Emergency Contact ${index + 1}`} />
            <PanelViewState fields={field} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
