import {Workflow, WorkflowNode} from "@area-common/types";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import React, {FC, useState} from "react";

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

const ActionSection: FC<Props> = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div className={classes.content}>
        {props.workflow.nodes.filter(
          (node) => node.label === "action"
        ).map((node: WorkflowNode) => {
          return (
            <ActionContainer
              key={node.id}
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              action={node}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          );
        })}
        {props.workflow.nodes.filter(
          (node) => node.label === "action"
        ).length === 0 && (
          <>
            <div onClick={() => setIsOpen(true)}>
              <AddBox label={"action"}/>
            </div>
            <EditNodeBuilder
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              nodeType={"action"}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </>
        )}
      </div>
    </>
  );
};

type ContainerProps = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  action: WorkflowNode;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionContainer: FC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <ComponentBox label={props.action.name}/>
      </div>
      <EditNodeBuilder
        workflow={props.workflow}
        setWorkflow={props.setWorkflow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refresh={props.refresh}
        setRefresh={props.setRefresh}
        nodeType={"action"}
        currentNode={props.action}
      />
    </>
  );
};

export default ActionSection;
