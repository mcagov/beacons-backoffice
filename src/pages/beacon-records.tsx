import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import React, { FunctionComponent } from "react";

import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import PageContent from "../components/PageContent";
import { BeaconsTable } from "../components/BeaconsTable";
import PageHeader from "../components/PageHeader";

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

interface BeaconRecordsProps {
  beaconsGateway: IBeaconsGateway;
}

const BeaconRecords: FunctionComponent<BeaconRecordsProps> = ({
  beaconsGateway,
}): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PageHeader>Beacon records</PageHeader>
      <PageContent>
        <Paper className={classes.paper}>
          <BeaconsTable beaconsGateway={beaconsGateway} />
        </Paper>
      </PageContent>
    </div>
  );
};

export default BeaconRecords;
