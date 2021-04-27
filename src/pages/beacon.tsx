import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tabs,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import PageContent from "../components/PageContent";
import PageHeader from "../components/PageHeader";
import { TabPanel } from "../components/TabPanel";

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
          <Grid direction="row" container justify="space-between" spacing={1}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <CardHeader title="Owner 1" />
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Name
                          </TableCell>
                          <TableCell>
                            <p>Mr. Beacon Owner</p>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Telephone
                          </TableCell>
                          <TableCell>
                            <Typography>07921021367</Typography>
                            <Typography>07921021369</Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Email
                          </TableCell>
                          <TableCell>
                            <Typography>mar@ten.com</Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell component="th" scope="row">
                            Address
                          </TableCell>
                          <TableCell>
                            <ul
                              style={{
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <li>Buckingham Palace</li>
                              <li>1 Pall Mall</li>
                              <li>W1 7QE</li>
                              <li>London</li>
                            </ul>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <List>
                  <ListItem key="99" divider alignItems="flex-start">
                    <ListItemText primary="LABEL" />
                    <ListItemText primary="DATA" />
                  </ListItem>
                </List>
              </Paper>
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

export default Beacon;
