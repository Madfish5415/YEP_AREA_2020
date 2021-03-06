import {Workflow, WorkflowNode} from "@area-common/types";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import React, {FC, useState} from "react";

import AddBox from "../../containers/addBox";
import ComponentBox from "../../containers/componentBox";
import AddActionDialog from "./addActionDialog";
import UpdateAction from "./updateAction";

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
  action: WorkflowNode;
};

const ActionSection: FC<Props> = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const actionNodes = props.workflow.nodes.filter(
    (node) => node.label === "action"
  );

  return (
    <>
      <div className={classes.content}>
        {actionNodes.map((node: WorkflowNode) => {
          return (
            <ActionContainer
              key={node.id}
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              action={node}
            />
          );
        })}
        {actionNodes.length === 0 && (
          <>
            <div onClick={() => setIsOpen(true)}>
              <AddBox label={"action"}/>
            </div>
            <AddActionDialog
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </>
        )}
      </div>
    </>
  );
};

const ActionContainer: FC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <ComponentBox label={props.action.name}/>
      </div>
      <UpdateAction
        action={props.action}
        workflow={props.workflow}
        setWorkflow={props.setWorkflow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default ActionSection;
