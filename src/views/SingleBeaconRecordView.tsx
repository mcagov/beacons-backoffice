import { Grid, Tab, Tabs } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { OwnerSummaryPanel } from "panels/OwnerSummaryPanel";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PageContent } from "../components/layout/PageContent";
import { PageHeader } from "../components/layout/PageHeader";
import { TabPanel } from "../components/layout/TabPanel";
import { IBeacon } from "../entities/IBeacon";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { BeaconSummaryPanel } from "../panels/beaconSummaryPanel/BeaconSummaryPanel";
import { EmergencyContactSummaryPanel } from "../panels/EmergencyContactSummaryPanel";

interface ISingleBeaconRecordViewProps {
  beaconsGateway: IBeaconsGateway;
  beaconId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
);

export const SingleBeaconRecordView: FunctionComponent<ISingleBeaconRecordViewProps> = ({
  beaconsGateway,
  beaconId,
}): JSX.Element => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [beacon, setBeacon] = useState<IBeacon>({} as IBeacon);

  useEffect((): void => {
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);
        setBeacon(beacon);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeacon(beaconId);
  }, [beaconId, beaconsGateway]); // eslint-disable-line

  const hexId = beacon?.hexId || "";
  const numberOfUses = beacon?.uses?.length.toString() || "";

  return (
    <div className={classes.root}>
      <PageHeader>Hex ID/UIN: {hexId}</PageHeader>
      <PageContent>
        <BeaconSummaryPanel
          beaconsGateway={beaconsGateway}
          beaconId={beaconId}
        />
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Owner & Emergency Contacts" />
          <Tab label={`${numberOfUses} Registered Uses`} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Grid direction="row" container justify="space-between" spacing={1}>
            <Grid item xs={6}>
              <OwnerSummaryPanel
                beaconsGateway={beaconsGateway}
                beaconId={beaconId}
              />
            </Grid>
            <Grid item xs={6}>
              <EmergencyContactSummaryPanel
                beaconsGateway={beaconsGateway}
                beaconId={beaconId}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {""}
        </TabPanel>
      </PageContent>
    </div>
  );
};
