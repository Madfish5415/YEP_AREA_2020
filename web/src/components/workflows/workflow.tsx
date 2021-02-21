import React, { FC, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { gray, white } from "@area-common/styles";
import IOSSwitch from "../switch/switch";
import { Workflow } from "@area-common/types";
import Router from "next/router";

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
    dialogTitle: {
      color: white,
    },
    dialogButton: {
      color: white,
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
  const [open, setOpen] = useState(false);

  const handleOpen = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWorkflowEdit = () => {
    Router.push({
      pathname: "/workflow/" + props.workflow.id,
    });
  };

  const handleSwitchWorkflow = (event: React.ChangeEvent<{}>) => {
    event.stopPropagation();
    props.isActiveCallback(props.workflow);
  };

  const handleWorkflowDelete = () => {
    props.deleteCallback(props.workflow);
  };

  const findBlobId: (id: string) => number = (id) => {
    return parseInt("0x" + id[id.length - 1]) % 10;
  };

  const findBlodPosition: (id: string) => string = (id) => {
    const xOffset = (parseInt("0x" + id[id.length - 3]) % 10) * 1;
    const yOffset = (parseInt("0x" + id[id.length - 2]) % 10) * 1;
    const xVal =
      parseInt("0x" + id[id.length - 5]) % 2 ? 30 + xOffset : 30 - xOffset;
    const yVal =
      parseInt("0x" + id[id.length - 4]) % 2 ? 30 + yOffset : 30 - yOffset;
    return xVal + "% " + yVal + "%";
  };

  return (
    <>
      <Box
        boxShadow={3}
        className={classes.root}
        style={{
          backgroundImage:
            "url(/assets/images/blob" + findBlobId(props.workflow.id) + ".svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: findBlodPosition(props.workflow.id),
          backgroundSize: "140%",
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
          <Button className={classes.deleteButtonText} onClick={handleOpen}>
            Delete
          </Button>
        </div>
      </Box>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { backgroundColor: gray.light1, boxShadow: "1" },
        }}
      >
        <DialogTitle className={classes.dialogTitle}>
          Do you want to delete this workflow ?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            className={classes.dialogButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleWorkflowDelete}
            color="primary"
            className={classes.dialogButton}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkflowComponent;
