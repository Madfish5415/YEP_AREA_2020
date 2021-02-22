import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { Workflow, WorkflowReaction } from "@area-common/types";
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

const ReactionsSection: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        {props.workflow.reactions.map((reaction: WorkflowReaction) => {
          return (
            <ComponentBox
              key={reaction.reaction.id}
              label={reaction.reaction.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default ReactionsSection;
