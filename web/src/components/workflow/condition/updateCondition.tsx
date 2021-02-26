import React, { FC, useState } from "react";
import {
  createStyles,
  makeStyles,
  withStyles,
  WithStyles,
  Theme,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { gray, primary, white, secondary } from "@area-common/styles";
import { Workflow, WorkflowExecution } from "@area-common/types";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    dialogTitle: {
      fontWeight: "bold",
      fontSize: 40,
      color: primary.main,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: gray.light2,
    },
  });

const CssTextField = withStyles({
  root: {
    "& .MuiInput-underline:before": {
      borderBottomColor: primary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: primary.main,
    },
  },
})(TextField);

type Props = {
  execution: WorkflowExecution;
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  label: string;
  handleExecutionNameChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {
    children,
    classes,
    onClose,
    label,
    handleExecutionNameChange,
    ...other
  } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <CssTextField
        id="actionName"
        name="name"
        margin="normal"
        label=""
        InputProps={{ className: classes.dialogTitle }}
        defaultValue={label}
        onChange={handleExecutionNameChange}
      />
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const UpdateCondition: FC<Props> = (props) => {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleExecutionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newWorkflow = props.workflow;

    newWorkflow.executions.forEach((execution, index) => {
      if (execution.id === props.execution.id) {
        newWorkflow.executions[index].name = event.target.value;
      }
    });
    props.setWorkflow(newWorkflow);
  };

  return (
    <>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth={"md"}
        open={props.isOpen}
        onClose={handleClose}
        PaperProps={{
          style: { backgroundColor: gray.light1, boxShadow: "1" },
        }}
      >
        <DialogTitle
          id={props.execution.id}
          onClose={handleClose}
          label={props.execution.name}
          handleExecutionNameChange={handleExecutionNameChange}
        >
          {props.execution.name}
        </DialogTitle>
        <DialogContent>Plop</DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateCondition;
