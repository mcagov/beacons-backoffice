import { Paper, Tab, Tabs } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import { TabPanel } from "./TabPanel";
import PageContent from "../components/PageContent";
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

const Beacon: FunctionComponent = (): JSX.Element => {
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
          <b>Summary</b>
        </Paper>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Owner & Emergency Contacts" />
          <Tab label={`${numberOfUses} Registered Uses`} />
        </Tabs>
        <TabPanel value={value} index={0}>
          Hello I am owner of boat
        </TabPanel>
        <TabPanel value={value} index={1}>
          Hello I am beacon use
        </TabPanel>
      </PageContent>
    </div>
  );
};

export default Beacon;
