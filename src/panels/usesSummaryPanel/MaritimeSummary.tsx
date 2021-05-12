import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { IUse } from "entities/IUse";
import { FunctionComponent } from "react";

interface MaritimeSummaryProps {
  use: IUse;
}

export const MaritimeSummary: FunctionComponent<MaritimeSummaryProps> = ({
  use,
}: MaritimeSummaryProps): JSX.Element => {
  const fields: IField[] = [];
  fields.push(...getVesselSummaryFields(use));
  fields.push(...getVesselCommunicationsFields(use));
  fields.push({
    key: "More details",
    value: use?.moreDetails,
  });

  return <PanelViewState fields={fields} />;
};

const getVesselSummaryFields = (use: IUse): IField[] => [
  { key: "Max persons onboard", value: `${use.maxCapacity || ""}` },
  { key: "Vessel name", value: use?.vesselName },
  { key: "Beacon position", value: use?.beaconLocation },
  { key: "Port Letter and Number (PLN)", value: use?.portLetterNumber },
  { key: "Homeport", value: use?.homeport },
  { key: "Area of operation", value: use?.areaOfOperation },
  { key: "IMO number", value: `${use?.imoNumber}` },
  { key: "UK Small Ships Register (SSR) number", value: use?.ssrNumber },
  {
    key: "Registry of Shipping and Seamen (RSS) number",
    value: use?.rssNumber,
  },
  {
    key: "Vessel official number",
    value: use?.officialNumber,
  },
  {
    key: "Windfarm or rig platform location",
    value: use?.rigPlatformLocation,
  },
  {
    key: "Call sign",
    value: use?.callSign,
  },
];

const getVesselCommunicationsFields = (use: IUse): IField[] => {
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

  if (use.otherCommunication) {
    fields.push(
      {
        key: `Communication type ${communicationTypeIndex}`,
        value: "Other",
      },
      {
        key: "Details",
        value: use?.otherCommunicationValue,
      }
    );
    communicationTypeIndex++;
  }

  return fields;
};
