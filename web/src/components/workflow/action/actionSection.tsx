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

  const findActionNumber = () => {
    let nbAction = 0;

    props.workflow.nodes.forEach((node, index) => {
      if (node.label === "action") {
        nbAction += 1;
      }
    });
    return nbAction;
  };

  return (
    <>
      <div className={classes.content}>
        {props.workflow.nodes.map((node: WorkflowNode) => {
          {
            node.label === "action" && (
              <ComponentBox key={node.id} label={node.name} />
            );
          }
        })}
        {findActionNumber() === 0 && <AddBox label={"action"} />}
      </div>
    </>
  );
};

export default ActionSection;
