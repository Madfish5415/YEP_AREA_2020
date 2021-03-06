import { Workflow, WorkflowNode } from "@area-common/types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC, useState } from "react";

import AddBox from "../../containers/addBox";
import ComponentBox from "../../containers/componentBox";
import AddReactionDialog from "./addReactionDialog";
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
  reaction: WorkflowNode;
};

const ReactionsSection: FC<Props> = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const reactionNodes = props.workflow.nodes.filter(
    (node) => node.label === "reaction"
  );

  return (
    <>
      <div className={classes.content}>
        {reactionNodes.map((node: WorkflowNode) => {
          return (
            <ReactionContainer
              key={node.id}
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              reaction={node}
            />
          );
        })}
        <div onClick={() => setIsOpen(true)}>
          <AddBox label={"reaction"} />
        </div>
        <AddReactionDialog
          workflow={props.workflow}
          setWorkflow={props.setWorkflow}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
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
