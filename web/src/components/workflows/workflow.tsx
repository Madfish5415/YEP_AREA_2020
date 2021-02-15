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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: gray.light1,
      height: 200,
      width: 342,
      borderRadius: 30,
      overflow: "hidden",
    },
    switch: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: -50,
      marginRight: 10,
    },
    workflowName: {
      color: white,
      fontStyle: "bold",
      fontSize: 36,
      marginLeft: 15,
      marginTop: 20,
    },
    deleteButton: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 85,
      marginRight: 10,
    },
    deleteButtonText: {
      color: white,
      textTransform: "none",
      fontSize: 14,
    },
  })
);

const WorkflowComponent: FC = () => {
  const classes = useStyles();

  const handleWorkflowEdit = () => {
    console.log("edit my workflow");
  };

  const handleSwitchWorkflow = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    console.log("switch my workflow");
  };

  const handleWorkflowDelete = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    console.log("delete my workflow");
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
      <Typography className={classes.workflowName}>Workflow 1</Typography>
      <div className={classes.switch}>
        <IOSSwitch onClick={handleSwitchWorkflow} />
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
