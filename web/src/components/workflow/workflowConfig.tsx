import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, white } from "@area-common/styles";
import { Workflow } from "@area-common/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workflowConfig: {
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
    },
    configPart: {
      marginLeft: 75,
      marginRight: 75,
    },
    configPartTitle: {
      color: white,
      fontWeight: "bold",
      fontSize: 25,
    },
  })
);

type Props = {
  workflow: Workflow;
};

const WorkflowConfig: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.workflowConfig}>
        <div className={classes.configPart}>
          <Typography className={classes.configPartTitle}>Actions</Typography>
        </div>
        <div className={classes.configPart}>
          <Typography className={classes.configPartTitle}>
            Conditions
          </Typography>
        </div>
        <div className={classes.configPart}>
          <Typography className={classes.configPartTitle}>Reactions</Typography>
        </div>
      </div>
    </>
  );
};

export default WorkflowConfig;
