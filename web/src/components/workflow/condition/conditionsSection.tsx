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

const ConditionsSection: FC<Props> = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  return (
    <>
      <div className={classes.content}>
        {props.workflow.nodes.filter(
          (node) => node.label !== "action" && node.label !== "reaction"
        ).map((node: WorkflowNode) => {
          return (
            <ConditionContainer
              key={node.id}
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              execution={node}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          );
        })}
        <div onClick={() => setIsOpen(true)}>
          <AddBox label={"condition"} />
        </div>
        <EditNodeBuilder
          workflow={props.workflow}
          setWorkflow={props.setWorkflow}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          refresh={refresh}
          setRefresh={setRefresh}
          nodeType={"other"}
        />
      </div>
    </>
  );
};

type ContainerProps = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  execution: WorkflowNode;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConditionContainer: FC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <ComponentBox label={props.execution.name} />
      </div>
      <EditNodeBuilder
        workflow={props.workflow}
        setWorkflow={props.setWorkflow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        refresh={props.refresh}
        setRefresh={props.setRefresh}
        nodeType={"other"}
        currentNode={props.execution}
      />
    </>
  );
};

export default ConditionsSection;
