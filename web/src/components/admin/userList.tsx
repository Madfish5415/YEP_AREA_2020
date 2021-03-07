import {
  AdminUserBloc,
  AdminUserDeleteEvent,
  AdminUserDeleteState,
  AdminUserErrorState,
  AdminUserListEvent,
  AdminUserListState,
  AdminUserRepository,
  AdminUserState,
  AdminUserUpdateEvent,
  AdminUserUpdateState,
} from "@area-common/blocs";
import { User } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  List,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import UserLine from "./userLine";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10%",
    width: "80%",
    height: "100%"
  },
  list: {
    display: "flex",
    width: "100%",
    height: "100%"
  }
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
          return <ErrorState error={state.error} />;
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
      <List className={classes.list}>
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
