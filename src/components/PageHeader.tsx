import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent, ReactNode } from "react";

interface PageHeaderProps {
  children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "left",
      padding: theme.spacing(3),
    },
  })
);

const PageHeader: FunctionComponent<PageHeaderProps> = ({
  children,
}: PageHeaderProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        {children}
      </Grid>
    </div>
  );
};

export default PageHeader;
