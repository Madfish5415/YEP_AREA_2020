import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white, secondary } from "@area-common/styles";
import { Workflow, WorkflowNode } from "@area-common/types";
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
  const actionNodes = props.workflow.nodes.filter(
    (node) => node.label === "action"
  );

  return (
    <div className={classes.content}>
      {actionNodes.map((node: WorkflowNode) => {
        return <ComponentBox key={node.id} label={node.name} />;
      })}
      {actionNodes.length === 0 && <AddBox label={"action"} />}
    </div>
  );
};

export default ActionSection;
