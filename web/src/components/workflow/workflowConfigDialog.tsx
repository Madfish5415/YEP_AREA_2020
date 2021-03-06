import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, white } from "@area-common/styles";
import { Workflow } from "@area-common/types";
import ActionSection from "./action/actionSection";
import ConditionsSection from "./condition/conditionsSection";
import ReactionsSection from "./reaction/reactionsSection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    workflowConfig: {
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
      height: "100%",
    },
    configPart: {
      marginLeft: 75,
      marginRight: 75,
    },
    configPartTitle: {
      color: white,
      fontWeight: "bold",
      fontSize: 25,
      display: "flex",
      justifyContent: "center",
    },
    configSection: {
      display: "flex",
      justifyContent: "center",
      height: "100%",
    },
  })
);

type Props = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
};

const WorkflowConfigDialog: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.workflowConfig}>
        <div className={classes.configPart}>
          <Typography className={classes.configPartTitle}>Actions</Typography>
          <div className={classes.configSection}>
            <ActionSection
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
            />
          </div>
        </div>
        <div className={classes.configPart}>
          <Typography className={classes.configPartTitle}>
            Conditions
          </Typography>
          <div className={classes.configSection}>
            <ConditionsSection
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
            />
          </div>
        </div>
        <div className={classes.configPart}>
          <Typography className={classes.configPartTitle}>Reactions</Typography>
          <div className={classes.configSection}>
            <ReactionsSection
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkflowConfigDialog;
