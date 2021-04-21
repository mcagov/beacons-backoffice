import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PageContent from "components/PageContent";
import PageHeader from "components/PageHeader";
import React, { FunctionComponent } from "react";
import { BeaconsTable } from "../components/BeaconsTable";

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

const BeaconRecords: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PageHeader>Beacon records</PageHeader>
      <PageContent>
        <Paper className={classes.paper}>
          <BeaconsTable />
        </Paper>
      </PageContent>
    </div>
  );
};

export default BeaconRecords;
