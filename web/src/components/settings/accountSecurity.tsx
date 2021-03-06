import React, { FC, useState, useEffect } from "react";
import { makeStyles, Theme, Typography, Button } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { User, Account } from "@area-common/types";
import SettingsTextInput from "./settingsTextInput";
import {
  AccountBloc,
  AccountRepository,
  AccountState,
  AccountReadEvent,
  AccountReadState,
  AccountUpdateState,
  AccountUpdateEvent,
  AccountErrorState,
} from "@area-common/blocs";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { BlocBuilder } from "@felangel/react-bloc";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

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
  updateUser: (user: Partial<User>) => void;
};

const AccountSecurity: FC<Props> = (props) => {
  const router = useRouter();
  let token = "";
  const accountBloc = new AccountBloc(
    new AccountRepository("http://localhost:8080")
  );
  useEffect(() => {
    const tmp = localStorage.getItem("jwt");
    if (!tmp) {
      router
        .push("/authentication/signin")
        .then()
        .catch((e) => console.log(e));
    } else {
      token = tmp;
      accountBloc.add(new AccountReadEvent(token));
    }
  });

  const updateAccount = (account: Partial<Account>) => {
    accountBloc.add(new AccountUpdateEvent(token, account));
  };

  return (
    <BlocBuilder
      bloc={accountBloc}
      key={uuidv4()}
      condition={(_, current: AccountState) => {
        if (current instanceof AccountUpdateState) {
          accountBloc.add(new AccountReadEvent(token));
        }
        return true;
      }}
      builder={(state: AccountState) => {
        if (state instanceof AccountErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof AccountReadState) {
          return (
            <AccountSecurityComponent
              user={props.user}
              updateUser={props.updateUser}
              account={(state as AccountReadState).account}
              updateAccount={updateAccount}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type ComponentProps = {
  user: User;
  updateUser: (user: Partial<User>) => void;
  account: Account;
  updateAccount: (account: Partial<Account>) => void;
};

const AccountSecurityComponent: FC<ComponentProps> = (props) => {
  const classes = useStyles();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (newPassword !== "" && newPassword === confirmPassword) {
      console.log("new password ", newPassword);
      // props.updateAccount({
      //   email: props.account.email,
      //   password: newPassword,
      // });
    }
  };

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.partTitle}>Account security</Typography>
        <div className={classes.accountInfo}>
          <Typography className={classes.inputTitle}>Email</Typography>
          <SettingsTextInput value={props.account.email} disabled />
        </div>
        <div className={classes.accountInfo}>
          <Typography className={classes.inputTitle}>New password</Typography>
          <SettingsTextInput
            value={newPassword}
            onChange={setNewPassword}
            password
          />
        </div>
        <div className={classes.accountInfo}>
          <Typography className={classes.inputTitle}>
            Confirm new password
          </Typography>
          <SettingsTextInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            password
          />
        </div>
        <Typography
          className={classes.conditionText}
        >{`Make sure it's at least 15 characters OR at least 8 characters including a number and a lowerwase letter.`}</Typography>
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
