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
  Divider,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { gray, primary, white } from "@area-common/styles";
import { User } from "@area-common/types";
import UpdateUserField from "./updateUserField";
import DeleteIcon from "@material-ui/icons/Delete";
import IOSSwitch from "../switch/switch";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      display: "flex",
    },
    firstColumn: {
      margin: 20,
    },
    deleteButton: {
      marginTop: 50,
      height: 40,
      width: 250,
      color: white,
      textTransform: "none",
      fontSize: 20,
      backgroundColor: primary.main,
      "&:hover": {
        backgroundColor: primary.dark2,
      },
    },
    secondColumn: {
      margin: 20,
    },
    emailVerification: {
      display: "flex",
      alignItems: "center",
    },
    switchTitle: {
      fontSize: 20,
      color: gray.light2,
    },
    switch: {
      transform: "scaleX(0.7) scaleY(0.7)",
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
      color: white,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: gray.light2,
    },
  });

type Props = {
  user: User;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  label: string;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, label, ...other } = props;
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography className={classes.dialogTitle}>{props.label}</Typography>
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

const UpdateUserDialog: FC<Props> = (props) => {
  const classes = useStyles();
  const [username, setUsername] = useState(props.user.username);
  const [firstName, setFirstName] = useState(
    props.user.firstName ? props.user.firstName : ""
  );
  const [lastName, setLastName] = useState(
    props.user.lastName ? props.user.lastName : ""
  );
  const [email, setEmail] = useState("frappeLaMatt@gmail.com");
  const [password, setPassword] = useState("azerty");

  const handleClose = () => {
    props.setOpen(false);
  };

  const updateUsername = () => {
    props.updateUser(props.user.id, { username: username });
  };

  const updateFirstName = () => {
    props.updateUser(props.user.id, { firstName: firstName });
  };

  const updateLastName = () => {
    props.updateUser(props.user.id, { lastName: lastName });
  };

  const updateEmail = () => {
    console.log("email updated");
  };

  const updatePassword = () => {
    console.log("password updated");
  };

  const switchEmailVerification = () => {
    console.log("email verification switch");
  };

  return (
    <>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth={"lg"}
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          style: {
            backgroundColor: gray.light1,
            boxShadow: "1",
            borderRadius: 20,
          },
        }}
      >
        <DialogTitle
          id={props.user.id}
          onClose={handleClose}
          label={props.user.username}
        >
          {props.user.username}
        </DialogTitle>
        <DialogContent>
          <div className={classes.content}>
            <div className={classes.firstColumn}>
              <UpdateUserField
                label={"Username"}
                value={username}
                setValue={setUsername}
                onSubmit={updateUsername}
              />
              <UpdateUserField
                label={"First name"}
                value={firstName}
                setValue={setFirstName}
                onSubmit={updateFirstName}
              />
              <UpdateUserField
                label={"Last name"}
                value={lastName}
                setValue={setLastName}
                onSubmit={updateLastName}
              />
              <Button
                className={classes.deleteButton}
                startIcon={<DeleteIcon />}
                onClick={() => props.deleteUser(props.user.id)}
              >
                Delete user
              </Button>
            </div>
            <div className={classes.secondColumn}>
              <UpdateUserField
                label={"Email"}
                value={email}
                setValue={setEmail}
                onSubmit={updateEmail}
              />
              <UpdateUserField
                label={"Password"}
                value={password}
                setValue={setPassword}
                onSubmit={updatePassword}
                password
              />
              <div className={classes.emailVerification}>
                <Typography className={classes.switchTitle}>
                  Email verification
                </Typography>
                <div className={classes.switch}>
                  <IOSSwitch onChange={switchEmailVerification} />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateUserDialog;
