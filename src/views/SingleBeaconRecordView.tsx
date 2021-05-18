import { Grid, Tab, Tabs } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IBeacon } from "entities/IBeacon";
import { IUsesGateway } from "gateways/IUsesGateway";
import { OwnerPanel } from "panels/ownerPanel/OwnerPanel";
import { UsesListPanel } from "panels/usesPanel/UsesListPanel";
import React, { FunctionComponent, useEffect, useState } from "react";
import { PageContent } from "../components/layout/PageContent";
import { PageHeader } from "../components/layout/PageHeader";
import { TabPanel } from "../components/layout/TabPanel";
import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { BeaconSummaryPanel } from "../panels/beaconSummaryPanel/BeaconSummaryPanel";
import { EmergencyContactPanel } from "../panels/emergencyContactPanel/EmergencyContactPanel";

interface ISingleBeaconRecordViewProps {
  beaconsGateway: IBeaconsGateway;
  usesGateway: IUsesGateway;
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
  usesGateway,
  beaconId,
}): JSX.Element => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<{}>, tab: number) => {
    setSelectedTab(tab);
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
  }, [beaconId, beaconsGateway]);

  const hexId = beacon?.hexId || "";
  const numberOfUses = beacon?.uses?.length.toString() || "";

  return (
    <div className={classes.root}>
      <PageHeader>
        Hex ID/UIN: {hexId} ({beacon.type || ""})
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
              <OwnerPanel beaconsGateway={beaconsGateway} beaconId={beaconId} />
            </Grid>
            <Grid item xs={6}>
              <EmergencyContactPanel
                beaconsGateway={beaconsGateway}
                beaconId={beaconId}
              />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <UsesListPanel usesGateway={usesGateway} beaconId={beaconId} />
        </TabPanel>
      </PageContent>
    </div>
  );
};
