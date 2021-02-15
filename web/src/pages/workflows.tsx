import React, { FC } from "react";
import AppBarComponent from "../components/appbar/appbar";
import WorkflowComponent from "../components/workflows/workflow";
import { makeStyles, Theme, Typography } from "@material-ui/core";
import { gray } from "@area-common/styles";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: gray.main,
  },
  title: {
    marginLeft: 125,
    marginTop: 40,
    color: gray.light2,
    fontSize: 30,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
}));

const WorkflowsPage: FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBarComponent />
      <div className={classes.content}>
        <Typography className={classes.title}>My workflows</Typography>
        <WorkflowComponent />
      </div>
    </>
  );
};

export default WorkflowsPage;
