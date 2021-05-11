import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { IUse } from "entities/IUse";
import React, { FunctionComponent } from "react";

interface VesselCommunicationsProps {
  use: IUse;
}

export const VesselCommunications: FunctionComponent<VesselCommunicationsProps> = ({
  use,
}: VesselCommunicationsProps): JSX.Element => {
  const fields: IField[] = getVesselCommsFields(use);

  return <PanelViewState fields={fields} />;
};

const getVesselCommsFields = (use: IUse): IField[] => {
  const fields = [];
  let communicationTypeIndex = 1;

  if (use.vhfRadio) {
    fields.push({
      key: `Communication type ${communicationTypeIndex}`,
      value: "vhf radio",
    });
    communicationTypeIndex++;
  }

  if (use.fixedVhfRadio) {
    fields.push(
      {
        key: `Communication type ${communicationTypeIndex}`,
        value: "fixed vhf/dsc",
      },
      { key: "MMSI", value: use?.fixedVhfRadioValue }
    );
    communicationTypeIndex++;
  }

  if (use.portableVhfRadio) {
    fields.push(
      {
        key: `Communication type ${communicationTypeIndex}`,
        value: "portable vhf/dsc",
      },
      { key: "Portable MMSI", value: use?.portableVhfRadioValue }
    );
    communicationTypeIndex++;
  }

  if (use.satelliteTelephone) {
    fields.push(
      {
        key: `Communication type ${communicationTypeIndex}`,
        value: "satellite telephone",
      },
      {
        key: "Phone number",
        value: use?.satelliteTelephoneValue,
      }
    );
    communicationTypeIndex++;
  }

  if (use.mobileTelephone) {
    fields.push(
      {
        key: `Communication type ${communicationTypeIndex}`,
        value: "mobile phone",
      },
      {
        key: "Number",
        value: [use?.mobileTelephone1, use?.mobileTelephone2],
      }
    );
    communicationTypeIndex++;
  }

  return fields;
};
