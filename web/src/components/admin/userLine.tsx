import React, { FC, useState, useEffect } from "react";
import {
  makeStyles,
  Theme,
  Button,
  Divider,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import {
  AdminAccountBloc,
  AdminAccountState,
  AdminAccountRepository,
  AdminAccountUpdateEvent,
  AdminAccountErrorState,
  AdminAccountReadEvent,
  AdminAccountReadState,
  AdminAccountUpdateState,
} from "@area-common/blocs";
import { gray, primary, white } from "@area-common/styles";
import { User, Account } from "@area-common/types";
import UpdateUserDialog from "./updateUserDialog";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { BlocBuilder } from "@felangel/react-bloc";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    width: "100%",
    maxWidth: "100%",
  },
  userText: {
    color: white,
  },
  userButton: {
    backgroundColor: primary.main,
    textTransform: "none",
    color: white,
    height: 30,
    width: 150,
    "&:hover": {
      backgroundColor: primary.dark2,
    },
  },
  divider: {
    color: gray.light2,
    height: 2,
  },
}));

type IntermediateProps = {
  user: User;
  updateUser: (id: string, updateUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
};

const UserLine: FC<IntermediateProps> = (props) => {
  const router = useRouter();
  let token = "";
  const adminAccountBloc = new AdminAccountBloc(
    new AdminAccountRepository("http://localhost:8080")
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
      adminAccountBloc.add(new AdminAccountReadEvent(token, props.user.id));
    }
  });

  const updateAccount = (id: string, account: Partial<Account>) => {
    adminAccountBloc.add(new AdminAccountUpdateEvent(token, id, account));
  };

  return (
    <BlocBuilder
      bloc={adminAccountBloc}
      key={uuidv4()}
      condition={(_, current: AdminAccountState) => {
        if (current instanceof AdminAccountUpdateState) {
          adminAccountBloc.add(new AdminAccountReadEvent(token, props.user.id));
        }
        return true;
      }}
      builder={(state: AdminAccountState) => {
        if (state instanceof AdminAccountErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof AdminAccountReadState) {
          return (
            <UserLineComponent
              user={props.user}
              updateUser={props.updateUser}
              deleteUser={props.deleteUser}
              account={(state as AdminAccountReadState).account}
              updateAccount={updateAccount}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  user: User;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
  account: Account;
  updateAccount: (id: string, account: Partial<Account>) => void;
};

const UserLineComponent: FC<Props> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={classes.content}>
        <ListItem>
          <ListItemText className={classes.userText}>
            {props.user.username}
          </ListItemText>
          <ListItemSecondaryAction>
            <Button
              className={classes.userButton}
              onClick={() => setOpen(true)}
            >
              Manage
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider className={classes.divider} />
        <UpdateUserDialog
          user={props.user}
          updateUser={props.updateUser}
          deleteUser={props.deleteUser}
          account={props.account}
          updateAccount={props.updateAccount}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </>
  );
};

export default UserLine;
