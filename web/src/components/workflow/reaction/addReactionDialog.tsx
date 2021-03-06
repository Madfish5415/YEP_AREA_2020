import {gray, primary} from "@area-common/styles";
import {Workflow, WorkflowNode} from "@area-common/types";
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import React, {FC, useState} from "react";
import {v4 as uuidv4} from "uuid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      backgroundColor: primary.main,
      color: "white",
      fontSize: 15,
      textTransform: "none",
      height: 40,
      maxWidth: 60,
      minWidth: 60,
      borderRadius: 40 / 2,
      "&:hover": {
        backgroundColor: primary.dark2,
      },
    },
  })
);

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
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string | undefined;
  children: React.ReactNode;
  label: string | undefined;
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
        placeholder="Reaction name"
        InputProps={{className: classes.dialogTitle}}
        defaultValue={label}
        onChange={handleReactionNameChange}
      />
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const AddReactionDialog: FC<Props> = (props) => {
  const classes = useStyles();
  const [reaction, setReaction] = useState<Partial<WorkflowNode>>({
    id: uuidv4(),
    serviceId: undefined,
    nodeId: undefined,
    name: undefined,
    label: undefined,
    parameters: undefined,
    condition: undefined,
    nextNodes: undefined
  });

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleReactionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReaction({...reaction, name: event.target.value});
  };

  const handleAdd = () => {
    const newWorkflow = props.workflow;

    if (!reaction.id || !reaction.serviceId || !reaction.nodeId || !reaction.name || !reaction.label ||
      !reaction.parameters || !reaction.condition || !reaction.nextNodes) {
      return
    }
    if (reaction.nextNodes.length === 0) {
      return
    }

    newWorkflow.nodes.push(reaction as WorkflowNode);
    props.setWorkflow(newWorkflow);
    setReaction({
      id: uuidv4(),
      serviceId: undefined,
      nodeId: undefined,
      name: undefined,
      label: undefined,
      parameters: undefined,
      condition: undefined,
      nextNodes: undefined
    });
    props.setIsOpen(false);
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
          style: {backgroundColor: gray.light1, boxShadow: "1"},
        }}
      >
        <DialogTitle
          id={reaction.id}
          onClose={handleClose}
          label={reaction.name}
          handleReactionNameChange={handleReactionNameChange}
        >
          {reaction.name}
        </DialogTitle>
        <DialogContent>Plop</DialogContent>
        <DialogActions>
          <Button className={classes.addButton} onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddReactionDialog;
