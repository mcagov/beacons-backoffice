import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { Activities, IUse } from "entities/IUse";
import React, { FunctionComponent } from "react";

interface LandSummaryProps {
  use: IUse;
}

export const LandSummary: FunctionComponent<LandSummaryProps> = ({
  use,
}: LandSummaryProps) => {
  const fields = getLandFields(use);

  return <PanelViewState fields={fields} />;
};

const getLandFields = (use: IUse): IField[] => {
  const fields: IField[] = [];
  fields.push(...getLandSummaryFields(use));

  return fields;
};

const getLandSummaryFields = (use: IUse): IField[] => {
  const fields: IField[] = [];

  if (use.activity === Activities.WorkingRemotely) {
    fields.push(
      {
        key: "Where",
        value: use?.workingRemotelyLocation,
      },
      {
        key: "Typical number of people with you",
        value: `${use.workingRemotelyPeopleCount || ""}`,
      }
    );
  }

  if (use.activity === Activities.Windfarm) {
    fields.push(
      {
        key: "Where",
        value: use?.windfarmLocation,
      },
      {
        key: "Typical number of people with you",
        value: `${use.windfarmPeopleCount || ""}`,
      }
    );
  }

  if (use.activity === Activities.Other) {
    fields.push(
      {
        key: "Other activity description",
        value: use?.otherActivity,
      },
      { key: "Where", value: use?.otherActivityLocation },
      {
        key: "Typical number of people with you",
        value: `${use.otherActivityPeopleCount || ""}`,
      }
    );
  }

  return fields;
};
