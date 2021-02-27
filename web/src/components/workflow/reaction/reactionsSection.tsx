import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { Workflow, WorkflowReaction } from "@area-common/types";
import ComponentBox from "../../containers/componentBox";
import WorkflowComponent from "../../workflows/workflow";
import AddBox from "../../containers/addBox";
import UpdateReaction from "./updateReaction";

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

type ContainerProps = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  reaction: WorkflowReaction;
};

const ReactionsSection: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        {props.workflow.reactions.map((reaction: WorkflowReaction) => {
          return (
            <ReactionContainer
              key={reaction.id}
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              reaction={reaction}
            />
          );
        })}
        <AddBox label={"reaction"} />
      </div>
    </>
  );
};

const ReactionContainer: FC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <ComponentBox label={props.reaction.name} />
      </div>
      <UpdateReaction
        reaction={props.reaction}
        workflow={props.workflow}
        setWorkflow={props.setWorkflow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default ReactionsSection;
