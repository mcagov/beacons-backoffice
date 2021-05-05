import { Grid, Paper, Tab, Tabs } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { OwnerSummaryPanel } from "panels/OwnerSummaryPanel";
import React, { FunctionComponent } from "react";
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

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const numberOfUses = 3;

  return (
    <div className={classes.root}>
      <PageHeader>
        Hex ID/UIN: <b>{hexId}</b>
      </PageHeader>
      <PageContent>
        <Paper className={classes.paper}>
          <BeaconSummaryPanel
            beaconsGateway={beaconsGateway}
            beaconId={beaconId}
          />
        </Paper>
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
              <EmergencyContactSummaryPanel />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Hello I am beacon use
        </TabPanel>
      </PageContent>
    </div>
  );
};
