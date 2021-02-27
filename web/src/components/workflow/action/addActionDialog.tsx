import React, { FC, useState } from "react";
import {
  createStyles,
  makeStyles,
  withStyles,
  WithStyles,
  Theme,
  Typography,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { gray, primary, white } from "@area-common/styles";
import { Workflow } from "@area-common/types";
import { v4 as uuidv4 } from "uuid";

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
  id: string;
  children: React.ReactNode;
  label: string;
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
        InputProps={{ className: classes.dialogTitle }}
        defaultValue={label}
        onChange={handleActionNameChange}
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

const AddActionDialog: FC<Props> = (props) => {
  const [action, setAction] = useState({
    id: uuidv4(),
    name: "",
    serviceId: uuidv4(),
    actionId: uuidv4(),
  });

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleActionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAction({ ...action, name: event.target.value });
  };

  const handleAdd = () => {
    const newWorkflow = props.workflow;

    newWorkflow.actions.push(action);
    props.setWorkflow(newWorkflow);
    setAction({
      id: uuidv4(),
      name: "",
      serviceId: uuidv4(),
      actionId: uuidv4(),
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
          style: { backgroundColor: gray.light1, boxShadow: "1" },
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
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddActionDialog;
