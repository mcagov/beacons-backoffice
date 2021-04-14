import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PageContent from "components/page-content";
import PageHeader from "components/page-header";
import React, { FunctionComponent } from "react";

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
      <PageHeader>
        <div>Beacon records page header</div>
      </PageHeader>
      <PageContent>
        <Paper className={classes.paper}>
          Example content area for beacon records page
        </Paper>
      </PageContent>
    </div>
  );
};

export default BeaconRecords;
