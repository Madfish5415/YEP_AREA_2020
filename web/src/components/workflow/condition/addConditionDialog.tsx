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
  id: string;
  children: React.ReactNode;
  label: string;
  handleConditionNameChange: (
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
    handleConditionNameChange,
    ...other
  } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <CssTextField
        id="conditionName"
        name="name"
        margin="normal"
        label=""
        placeholder="Condition name"
        InputProps={{ className: classes.dialogTitle }}
        defaultValue={label}
        onChange={handleConditionNameChange}
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

const AddConditionDialog: FC<Props> = (props) => {
  const classes = useStyles();
  const [condition, setCondition] = useState({
    id: uuidv4(),
    name: "",
    executionId: uuidv4(),
  });

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleConditionNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCondition({ ...condition, name: event.target.value });
  };

  const handleAdd = () => {
    const newWorkflow = props.workflow;

    newWorkflow.executions.push(condition);
    props.setWorkflow(newWorkflow);
    setCondition({
      id: uuidv4(),
      name: "",
      executionId: uuidv4(),
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
          id={condition.id}
          onClose={handleClose}
          label={condition.name}
          handleConditionNameChange={handleConditionNameChange}
        >
          {condition.name}
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

export default AddConditionDialog;
