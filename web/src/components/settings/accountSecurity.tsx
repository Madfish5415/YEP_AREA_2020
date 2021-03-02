import React, { FC, useState } from "react";
import { makeStyles, Theme, Typography, Button } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { User } from "@area-common/types";
import SettingsTextInput from "./settingsTextInput";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: 125,
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
  },
  partTitle: {
    color: white,
    fontSize: 35,
    marginBottom: 20,
    fontWeight: "bold",
  },
  accountInfo: {
    marginBottom: 20,
  },
  inputTitle: {
    color: gray.light2,
    fontSize: 25,
  },
  conditionText: {
    color: white,
  },
  passwordButton: {
    marginTop: 20,
    color: white,
    textTransform: "none",
    fontSize: 14,
    backgroundColor: primary.main,
    borderRadius: 20,
    width: 200,
    "&:hover": {
      backgroundColor: primary.dark1,
    },
  },
}));

type Props = {
  user: User;
  updateUser: (id: string, user: Partial<User>) => void;
};

const AccountSecurity: FC<Props> = (props) => {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    console.log("password changed");
  };

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.partTitle}>Account security</Typography>
        <div className={classes.accountInfo}>
          <Typography className={classes.inputTitle}>Email</Typography>
          <SettingsTextInput value={"frappeLaMatt@gmail.com"} disabled />
        </div>
        <div className={classes.accountInfo}>
          <Typography className={classes.inputTitle}>Old password</Typography>
          <SettingsTextInput
            value={oldPassword}
            onSubmit={setOldPassword}
            password
          />
        </div>
        <div className={classes.accountInfo}>
          <Typography className={classes.inputTitle}>New password</Typography>
          <SettingsTextInput
            value={newPassword}
            onSubmit={setNewPassword}
            password
          />
        </div>
        <div className={classes.accountInfo}>
          <Typography className={classes.inputTitle}>
            Confirm new password
          </Typography>
          <SettingsTextInput
            value={confirmPassword}
            onSubmit={setConfirmPassword}
            password
          />
        </div>
        <Typography
          className={classes.conditionText}
        >{`Make sure it's at least 15 QR at least 8 characters including a number and a lowerwase letter.`}</Typography>
        <Button
          className={classes.passwordButton}
          onClick={handlePasswordChange}
        >
          Update password
        </Button>
      </div>
    </>
  );
};

export default AccountSecurity;
