import React, { FC } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button,
} from "@material-ui/core";
import { gray, white } from "@area-common/styles";
import IOSSwitch from "../switch/switch";
import { Workflow } from "@area-common/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: gray.light1,
      height: 150,
      width: 256,
      borderRadius: 20,
      paddingTop: 10,
      overflow: "hidden",
    },
    titleAndSwitch: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 10,
    },
    switch: {
      transform: "scaleX(0.65) scaleY(0.65)",
    },
    workflowName: {
      color: white,
      fontWeight: "bold",
      fontSize: 25,
    },
    deleteButton: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 65,
      marginRight: 5,
    },
    deleteButtonText: {
      color: white,
      textTransform: "none",
      fontSize: 10,
    },
  })
);

type Props = {
  workflow: Workflow;
  deleteCallback: (workflow: Workflow) => void;
  isActiveCallback: (workflow: Workflow) => void;
};

const WorkflowComponent: FC<Props> = (props) => {
  const classes = useStyles();

  const handleWorkflowEdit = () => {
    console.log("edit my workflow");
  };

  const handleSwitchWorkflow = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    props.isActiveCallback(props.workflow);
  };

  const handleWorkflowDelete = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    props.deleteCallback(props.workflow);
  };

  return (
    <div
      className={classes.root}
      style={{
        backgroundImage: "url(/assets/images/blob1.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "30% 30%",
      }}
      onClick={handleWorkflowEdit}
    >
      <div className={classes.titleAndSwitch}>
        <Typography className={classes.workflowName}>
          {props.workflow.name}
        </Typography>
        <div className={classes.switch}>
          <IOSSwitch
            onClick={handleSwitchWorkflow}
            checked={props.workflow.isActive}
          />
        </div>
      </div>
      <div className={classes.deleteButton}>
        <Button
          className={classes.deleteButtonText}
          onClick={handleWorkflowDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default WorkflowComponent;
