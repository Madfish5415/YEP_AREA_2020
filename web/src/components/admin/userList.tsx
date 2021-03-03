import React, { FC } from "react";
import {
  makeStyles,
  Theme,
  Typography,
  Grid,
  Button,
  List,
} from "@material-ui/core";
import {
  UserBloc,
  UserRepository,
  UserState,
  UserUpdateState,
  UserUpdateEvent,
  UserErrorState,
  UserListEvent,
  UserListState,
  UserDeleteState,
  UserDeleteEvent,
} from "@area-common/blocs";
import { gray, white } from "@area-common/styles";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { User } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import { v4 as uuidv4 } from "uuid";
import UserLine from "./userLine";

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
  const usersBloc = new UserBloc(new UserRepository(""));
  usersBloc.add(new UserListEvent());

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    usersBloc.add(new UserUpdateEvent(id, updatedUser));
  };

  const deleteUser = (id: string) => {
    usersBloc.add(new UserDeleteEvent(id));
  };

  return (
    <BlocBuilder
      bloc={usersBloc}
      key={uuidv4()}
      condition={(_, current: UserState) => {
        if (current instanceof UserUpdateState) {
          usersBloc.add(new UserListEvent());
        }
        if (current instanceof UserDeleteState) {
          usersBloc.add(new UserListEvent());
        }
        return true;
      }}
      builder={(state: UserState) => {
        if (state instanceof UserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof UserListState) {
          return (
            <UserListComponent
              user={props.user}
              updateUser={updateUser}
              deleteUser={deleteUser}
              users={(state as UserListState).users}
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

  return (
    <>
      <div className={classes.content}>
        <List>
          {props.users.map(
            (user) =>
              user.id !== props.user.id && (
                <UserLine
                  key={user.id}
                  user={user}
                  updateUser={props.updateUser}
                  deleteUser={props.deleteUser}
                />
              )
          )}
        </List>
      </div>
    </>
  );
};

export default UserList;
