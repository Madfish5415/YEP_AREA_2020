import { gray, primary } from "@area-common/styles";
import { Workflow, WorkflowNode } from "@area-common/types";
import {
  createStyles,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import React, { FC } from "react";

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
  reaction: WorkflowNode;
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  label: string;
  handleReactionNameChange: (
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
    handleReactionNameChange,
    ...other
  } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <CssTextField
        id="reactionName"
        name="name"
        margin="normal"
        label=""
        InputProps={{ className: classes.dialogTitle }}
        defaultValue={label}
        onChange={handleReactionNameChange}
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

const UpdateReaction: FC<Props> = (props) => {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleReactionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newWorkflow = props.workflow;

    newWorkflow.nodes.forEach((reaction, index) => {
      if (reaction.id === props.reaction.id) {
        newWorkflow.nodes[index].name = event.target.value;
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
          id={props.reaction.id}
          onClose={handleClose}
          label={props.reaction.name}
          handleReactionNameChange={handleReactionNameChange}
        >
          {props.reaction.name}
        </DialogTitle>
        <DialogContent>Plop</DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateReaction;
