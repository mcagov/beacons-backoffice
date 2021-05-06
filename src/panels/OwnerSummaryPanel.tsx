import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from "@material-ui/core";
import {
  DataPanelStates,
  PanelViewState,
} from "components/dataPanel/PanelViewState";
import React, { FunctionComponent, useEffect, useState } from "react";
import { IOwner } from "../entities/IOwner";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";

interface OwnerSummaryPanelProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

export const OwnerSummaryPanel: FunctionComponent<OwnerSummaryPanelProps> = ({
  beaconsGateway,
  beaconId,
}) => {
  const [state, setState] = useState<DataPanelStates>(DataPanelStates.Loading);
  const [owner, setOwner] = useState<IOwner>();

  useEffect((): (() => void) => {
    let isMounted = true;
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);

        if (isMounted) {
          setOwner(beacon.owners[0]);
          setState(DataPanelStates.Viewing);
        }
      } catch (error) {
        console.error(error);
        setState(DataPanelStates.Error);
      }
    };

    fetchBeacon(beaconId);

    return () => {
      isMounted = false;
    };
  }, [beaconId, beaconsGateway]);

  const handleSubmit = (event: any) => {
    const owner: IOwner = {
      id: "",
      fullName: event.form.owner_name,
      email: "",
      telephoneNumber: "",
      addressLine1: "",
      addressLine2: "",
      townOrCity: "",
      county: "",
      postcode: "",
    };

    setState(DataPanelStates.Viewing);

    event.preventDefault();
  };

  const fields = [
    { key: "Name", value: owner?.fullName },
    { key: "Telephone", value: owner?.telephoneNumber },
    { key: "Email", value: owner?.email },
    {
      key: "Address",
      value: [
        owner?.addressLine1,
        owner?.addressLine2,
        owner?.townOrCity,
        owner?.county,
        owner?.postcode,
      ],
    },
  ];

  // TODO: Confirm with UCD what user feedback should be displayed if an error has occured when fetching a beacon
  const renderState = () => {
    switch (state) {
      case DataPanelStates.Viewing:
        return (
          <>
            <PanelViewState fields={fields} splitAfter={fields.length} />
            <Button
              onClick={() => {
                setState(DataPanelStates.Editing);
              }}
            >
              Edit
            </Button>
          </>
        );
      case DataPanelStates.Editing:
        return (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="owner_name"
              label="Owner name"
              value={owner?.fullName}
            />
            <TextField
              id="owner_telephone"
              label="Owner telephone number"
              value={owner?.telephoneNumber}
            />
            <TextField
              id="owner_email"
              label="Owner email"
              value={owner?.email}
            />
            <TextField
              id="owner_address_line_1"
              label="Address line 1"
              value={owner?.addressLine1}
            />
            <TextField
              id="owner_address_line_2"
              label="Address line 2"
              value={owner?.addressLine2}
            />
            <TextField
              id="owner_town_or_city"
              label="Town or city"
              value={owner?.townOrCity}
            />
            <TextField id="owner_county" label="County" value={owner?.county} />
            <TextField
              id="owner_postcode"
              label="Postcode"
              value={owner?.postcode}
            />
            <Button type="submit">Save owner</Button>
          </form>
        );
      case DataPanelStates.Error:
        return (
          <>
            <Button
              onClick={() => {
                setState(DataPanelStates.Editing);
              }}
            >
              Edit
            </Button>
          </>
        );
    }
  };

  return (
    <Card>
      <CardContent>
        <CardHeader title="Owner" />
        {renderState()}
      </CardContent>
    </Card>
  );
};
