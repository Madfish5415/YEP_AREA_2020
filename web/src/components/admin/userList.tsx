import React, { FC, useEffect } from "react";
import {
  makeStyles,
  Theme,
  Typography,
  Grid,
  Button,
  List,
} from "@material-ui/core";
import {
  AdminUserRepository,
  AdminUserBloc,
  AdminUserListEvent,
  AdminUserListState,
  AdminUserState,
  AdminUserUpdateEvent,
  AdminUserUpdateState,
  AdminUserDeleteEvent,
  AdminUserDeleteState,
  AdminUserErrorState,
} from "@area-common/blocs";
import { gray, white } from "@area-common/styles";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { User } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import { v4 as uuidv4 } from "uuid";
import UserLine from "./userLine";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "100%",
  },
}));

type Props = {
  user: User;
};

const UserList: FC<Props> = (props) => {
  const router = useRouter();
  let token = "";
  const adminUsersBloc = new AdminUserBloc(
    new AdminUserRepository("http://localhost:8080")
  );
  useEffect(() => {
    const tmp = localStorage.getItem("jwt");
    if (!tmp) {
      router
        .push("authentication/signin")
        .then()
        .catch((e) => console.log(e));
    } else {
      token = tmp;
      adminUsersBloc.add(new AdminUserListEvent(token));
    }
  });

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    adminUsersBloc.add(new AdminUserUpdateEvent(token, id, updatedUser));
  };

  const deleteUser = (id: string) => {
    adminUsersBloc.add(new AdminUserDeleteEvent(token, id));
  };

  return (
    <BlocBuilder
      bloc={adminUsersBloc}
      key={uuidv4()}
      condition={(_, current: AdminUserState) => {
        if (current instanceof AdminUserUpdateState) {
          adminUsersBloc.add(new AdminUserListEvent(token));
        }
        if (current instanceof AdminUserDeleteState) {
          adminUsersBloc.add(new AdminUserListEvent(token));
        }
        return true;
      }}
      builder={(state: AdminUserState) => {
        if (state instanceof AdminUserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof AdminUserListState) {
          return (
            <UserListComponent
              user={props.user}
              updateUser={updateUser}
              deleteUser={deleteUser}
              users={(state as AdminUserListState).users}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type CompProps = {
  user: User;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
  users: User[];
};

const UserListComponent: FC<CompProps> = (props) => {
  const classes = useStyles();
  const otherUsers = props.users.filter((user) => user.id !== props.user.id);

  return (
    <div className={classes.content}>
      <List>
        {otherUsers.map((user) => {
          return (
            <UserLine
              key={user.id}
              user={user}
              updateUser={props.updateUser}
              deleteUser={props.deleteUser}
            />
          );
        })}
      </List>
    </div>
  );
};

export default UserList;
