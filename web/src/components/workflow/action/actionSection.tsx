import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white, secondary } from "@area-common/styles";
import { Workflow, WorkflowAction } from "@area-common/types";
import ComponentBox from "../../containers/componentBox";
import AddBox from "../../containers/addBox";
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
  action: WorkflowAction;
};

const ActionSection: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        {props.workflow.actions.map((action: WorkflowAction) => {
          return (
            <ActionContainer
              key={action.id}
              workflow={props.workflow}
              setWorkflow={props.setWorkflow}
              action={action}
            />
          );
        })}
        {props.workflow.actions.length === 0 && <AddBox label={"action"} />}
      </div>
    </>
  );
};

const ActionContainer: FC<ContainerProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        <ComponentBox label={props.action.name} />
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
