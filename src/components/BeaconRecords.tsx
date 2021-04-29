import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import React, { FunctionComponent } from "react";

import { IBeaconsGateway } from "../gateways/IBeaconsGateway";
import { PageContent } from "./layout/PageContent";
import { BeaconsTable } from "./BeaconsTable";
import { PageHeader } from "./layout/PageHeader";
import {
  GetBeaconsInTableFormat,
  IUseCase,
} from "../useCases/GetBeaconsInTableFormat";

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
  getBeaconsInTableFormat: IUseCase;
}

export const BeaconRecords: FunctionComponent<BeaconRecordsProps> = ({
  getBeaconsInTableFormat,
}): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PageHeader>Beacon records</PageHeader>
      <PageContent>
        <Paper className={classes.paper}>
          <BeaconsTable getBeaconsInTableFormat={getBeaconsInTableFormat} />
        </Paper>
      </PageContent>
    </div>
  );
};
