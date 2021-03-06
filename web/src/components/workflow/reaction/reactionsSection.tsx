import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { Workflow, WorkflowNode } from "@area-common/types";
import ComponentBox from "../../containers/componentBox";
import WorkflowComponent from "../../workflows/workflow";
import AddReaction from "../../containers/addBox";

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

const ReactionsSection: FC<Props> = (props) => {
  const classes = useStyles();
  const reactionNodes = props.workflow.nodes.filter(
    (node) => node.label === "reaction"
  );

  return (
    <div className={classes.content}>
      {reactionNodes.map((node: WorkflowNode) => {
        return <ComponentBox key={node.id} label={node.name} />;
      })}
      <AddReaction label={"reaction"} />
    </div>
  );
};

export default ReactionsSection;
