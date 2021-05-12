import { IField, PanelViewState } from "components/dataPanel/PanelViewState";
import { IUse } from "entities/IUse";
import { FunctionComponent } from "react";

interface AviationSummaryProps {
  use: IUse;
}

export const AviationSummary: FunctionComponent<AviationSummaryProps> = ({
  use,
}: AviationSummaryProps): JSX.Element => {
  const fields = getAviationFields(use);

  return <PanelViewState fields={fields} />;
};

const getAviationFields = (use: IUse): IField[] => {
  const fields: IField[] = [];
  fields.push(...getAircraftSummaryFields(use));
  fields.push(...getAircraftCommunicationsFields(use));

  fields.push({
    key: "More details",
    value: use?.moreDetails,
  });

  return fields;
};

const getAircraftSummaryFields = (use: IUse): IField[] => [
  {
    key: "Max persons onboard",
    value: `${use.maxCapacity || ""}`,
  },
  {
    key: "Manufacturer and model",
    value: use?.aircraftManufacturer,
  },
  {
    key: "Principal airport",
    value: use?.principalAirport,
  },
  {
    key: "Secondary airport",
    value: use?.secondaryAirport,
  },
  {
    key: "Registration mark",
    value: use?.registrationMark,
  },
  {
    key: "24-bit hex address",
    value: use?.hexAddress,
  },
  {
    key: "Core serial number",
    value: use?.cnOrMsnNumber,
  },
  {
    key: "Is this a dongle?",
    value: use?.dongle === true ? "yes" : "no",
  },
  {
    key: "Beacon position",
    value: use?.beaconPosition,
  },
];

const getAircraftCommunicationsFields = (use: IUse): IField[] => {
  const fields = [];
  let typeOfCommunicationIndex = 1;

  if (use.vhfRadio) {
    fields.push({
      key: `Communication type ${typeOfCommunicationIndex}`,
      value: "vhf radio",
    });
    typeOfCommunicationIndex++;
  }

  if (use.satelliteTelephone) {
    fields.push(
      {
        key: `Communication type ${typeOfCommunicationIndex}`,
        value: "satellite telephone",
      },
      {
        key: "Phone number",
        value: use?.satelliteTelephoneValue,
      }
    );
    typeOfCommunicationIndex++;
  }

  if (use.mobileTelephone) {
    fields.push(
      {
        key: `Communication type ${typeOfCommunicationIndex}`,
        value: "mobile phone",
      },
      {
        key: "Number",
        value: [use?.mobileTelephone1, use?.mobileTelephone2],
      }
    );
    typeOfCommunicationIndex++;
  }

  if (use.otherCommunication) {
    fields.push(
      {
        key: `Communication type ${typeOfCommunicationIndex}`,
        value: "Other",
      },
      {
        key: "Details",
        value: use?.otherCommunicationValue,
      }
    );
    typeOfCommunicationIndex++;
  }

  return fields;
};
