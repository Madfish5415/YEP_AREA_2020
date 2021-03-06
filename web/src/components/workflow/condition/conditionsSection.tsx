import { Workflow, WorkflowNode } from "@area-common/types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC, useState } from "react";

import AddBox from "../../containers/addBox";
import ComponentBox from "../../containers/componentBox";
import AddConditionDialog from "./addConditionDialog";
import UpdateCondition from "./updateCondition";

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
  execution: WorkflowNode;
};

const ConditionsSection: FC<Props> = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const conditionNodes = props.workflow.nodes.filter(
    (node) => node.label !== "action" && node.label !== "reaction"
  );

  return (
    <>
      <div className={classes.content}>
        {conditionNodes.map((node: WorkflowNode) => {
          return (
            <ConditionContainer
              key={node.id}
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              execution={node}
            />
          );
        })}
        <div onClick={() => setIsOpen(true)}>
          <AddBox label={"condition"} />
        </div>
        <AddConditionDialog
          workflow={props.workflow}
          setWorkflow={props.setWorkflow}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
};

const ConditionContainer: FC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <ComponentBox label={props.execution.name} />
      </div>
      <UpdateCondition
        execution={props.execution}
        workflow={props.workflow}
        setWorkflow={props.setWorkflow}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default ConditionsSection;
