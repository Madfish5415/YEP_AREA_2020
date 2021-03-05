import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white, secondary } from "@area-common/styles";
import { Workflow, WorkflowAction } from "@area-common/types";
import ComponentBox from "../../containers/componentBox";
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

const ActionSection: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        {props.workflow.actions.map((action: WorkflowAction) => {
          return <ComponentBox key={action.id} label={action.name} />;
        })}
        {props.workflow.actions.length === 0 && <AddBox label={"action"} />}
      </div>
    </>
  );
};

export default ActionSection;
