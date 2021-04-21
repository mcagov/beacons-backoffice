import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PageContent from "components/PageContent";
import PageHeader from "components/PageHeader";
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

const Home: FunctionComponent = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <PageHeader>
        <div>Overview page header</div>
      </PageHeader>
      <PageContent>
        <Paper className={classes.paper}>
          Example content for overview page
        </Paper>
      </PageContent>
    </div>
  );
};

export default Home;
