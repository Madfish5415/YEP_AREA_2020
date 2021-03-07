import { Workflow, WorkflowNode } from "@area-common/types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC, useState } from "react";

import AddBox from "../../containers/addBox";
import ComponentBox from "../../containers/componentBox";
import EditNodeBuilder from "../edit/editNode";

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
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div className={classes.content}>
        {props.workflow.nodes.filter(
          (node) => node.label === "reaction"
        ).map((node: WorkflowNode) => {
          return (
            <ReactionContainer
              key={node.id}
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              reaction={node}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          );
        })}
        <div onClick={() => setIsOpen(true)}>
          <AddBox label={"reaction"} />
        </div>
        <EditNodeBuilder
          workflow={props.workflow}
          setWorkflow={props.setWorkflow}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          refresh={refresh}
          setRefresh={setRefresh}
          nodeType={"reaction"}
        />
      </div>
    </>
  );
};

type ContainerProps = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  reaction: WorkflowNode;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReactionContainer: FC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <ComponentBox label={props.reaction.name} />
      </div>
      <EditNodeBuilder
        workflow={props.workflow}
        setWorkflow={props.setWorkflow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refresh={props.refresh}
        setRefresh={props.setRefresh}
        nodeType={"reaction"}
        currentNode={props.reaction}
      />
    </>
  );
};

export default ReactionsSection;
