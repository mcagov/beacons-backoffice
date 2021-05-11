import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { IUse } from "entities/IUse";
import React, { FunctionComponent } from "react";

interface MoreDetailsProps {
  use: IUse;
}

export const MoreDetails: FunctionComponent<MoreDetailsProps> = ({
  use,
}: MoreDetailsProps): JSX.Element => {
  const fields: IField[] = [
    {
      key: "More details",
      value: use?.moreDetails,
    },
  ];

  return <PanelViewState fields={fields} />;
};
