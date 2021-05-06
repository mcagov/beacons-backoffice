import { Grid, Tab, Tabs } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IBeacon } from "entities/IBeacon";
import { OwnerSummaryPanel } from "panels/OwnerSummaryPanel";
import { UsesSummaryPanel } from "panels/UsesSummaryPanel";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PageContent } from "../components/layout/PageContent";
import { PageHeader } from "../components/layout/PageHeader";
import { TabPanel } from "../components/layout/TabPanel";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { BeaconSummaryPanel } from "../panels/BeaconSummaryPanel";
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
  const hexId = "Example Hex Id";

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, tab: number) => {
    setSelectedTab(tab);
  };

  const [beacon, setBeacon] = useState<IBeacon>();
  let numberOfUses: number = 0;

  useEffect((): void => {
    const fetchBeacon = async (id: string) => {
      try {
        const beacon = await beaconsGateway.getBeacon(id);

        setBeacon(beacon);
        numberOfUses = beacon.uses.length;
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeacon(beaconId);
  }, [beaconId, beaconsGateway]);

  return (
    <div className={classes.root}>
      <PageHeader>
        Hex ID/UIN: <b>{hexId}</b>
      </PageHeader>
      <PageContent>
        <BeaconSummaryPanel
          beaconsGateway={beaconsGateway}
          beaconId={beaconId}
        />
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Owner & Emergency Contacts" />
          <Tab label={`${numberOfUses} Registered Uses`} />
        </Tabs>
        <TabPanel value={selectedTab} index={0}>
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
        <TabPanel value={selectedTab} index={1}>
          <UsesSummaryPanel uses={beacon ? beacon.uses : []} />
        </TabPanel>
      </PageContent>
    </div>
  );
};
