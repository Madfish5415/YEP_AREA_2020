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
  handleActionNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const {
    children,
    classes,
    onClose,
    label,
    handleActionNameChange,
    ...other
  } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <CssTextField
        id="actionName"
        name="name"
        margin="normal"
        label=""
        placeholder="Action name"
        InputProps={{className: classes.dialogTitle}}
        defaultValue={label}
        onChange={handleActionNameChange}
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

const AddActionDialog: FC<Props> = (props) => {
  const classes = useStyles();
  const [action, setAction] = useState<Partial<WorkflowNode>>({
    id: uuidv4(),
    serviceId: "",
    nodeId: "",
    name: "",
    label: "action",
    parameters: {},
    condition: "",
    nextNodes: []
  });

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleActionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAction({...action, name: event.target.value});
  };

  const handleAdd = () => {
    const newWorkflow = props.workflow;

    if (!action.id || !action.serviceId || !action.nodeId || !action.name || !action.label || !action.parameters ||
      !action.condition || !action.nextNodes) {
      return
    }
    if (action.nextNodes.length === 0) {
      return
    }

    newWorkflow.nodes.push(action as WorkflowNode);
    props.setWorkflow(newWorkflow);
    setAction({
      id: uuidv4(),
      serviceId: "",
      nodeId: "",
      name: "",
      label: "action",
      parameters: {},
      condition: "",
      nextNodes: []
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
          id={action.id}
          onClose={handleClose}
          label={action.name}
          handleActionNameChange={handleActionNameChange}
        >
          {action.name}
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

export default AddActionDialog;
