import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { Workflow, WorkflowExecution } from "@area-common/types";
import ComponentBox from "../../containers/componentBox";
import WorkflowComponent from "../../workflows/workflow";
import AddBox from "../../containers/addBox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      alignItems: "center",
    },
  })
);

type Props = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
};

const ConditionsSection: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        {props.workflow.executions.map((execution: WorkflowExecution) => {
          return <ComponentBox key={execution.id} label={execution.name} />;
        })}
        <AddBox label={"condition"} />
      </div>
    </>
  );
};

export default ConditionsSection;
