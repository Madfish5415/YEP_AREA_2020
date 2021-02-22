import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { Workflow, WorkflowOperator } from "@area-common/types";
import ComponentBox from "../../containers/componentBox";
import WorkflowComponent from "../../workflows/workflow";

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
        {props.workflow.operators.map((condition: WorkflowOperator) => {
          return (
            <ComponentBox
              key={condition.operator.id}
              label={condition.operator.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default ConditionsSection;
