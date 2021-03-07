import React, { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SectionTitle } from "../common/section-title";
import {
  AdminUserState,
  AdminUserBloc,
  AdminUserErrorState,
  AdminUserRepository,
  AdminUserListEvent,
  AdminUserUpdateEvent,
  AdminUserDeleteEvent,
  AdminUserListState,
} from "@area-common/blocs";
import { getLocalStorage } from "../../common/localStorage";
import { User } from "@area-common/types";
import { useNavigation } from "@react-navigation/native";
import { BlocBuilder } from "@felangel/react-bloc";
import { ErrorState } from "../blocbuilder/error-state";
import { DefaultState } from "../blocbuilder/default-state";
import UserList from "./user-list";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AdminBoardBloc: FC = () => {
  const { navigate } = useNavigation();
  const adminUserBloc = new AdminUserBloc(
    new AdminUserRepository("http://localhost:8080")
  );

  getLocalStorage("@userToken")
    .then((userToken) => {
      if (userToken) {
        adminUserBloc.add(new AdminUserListEvent(userToken));
      } else {
        navigate("SignIn");
      }
    })
    .catch((error) => console.log("error:", error));

  const updateUser = (id: string, updatedUser: Partial<User>) => {
    getLocalStorage("@userToken")
      .then((userToken) => {
        if (userToken) {
          adminUserBloc.add(
            new AdminUserUpdateEvent(userToken, id, updatedUser)
          );
          adminUserBloc.add(new AdminUserListEvent(userToken));
        } else {
          navigate("SignIn");
        }
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = (id: string) => {
    getLocalStorage("@userToken")
      .then((userToken) => {
        if (userToken) {
          adminUserBloc.add(new AdminUserDeleteEvent(userToken, id));
          adminUserBloc.add(new AdminUserListEvent(userToken));
          navigate("AdminBoard");
        } else {
          navigate("SignIn");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <BlocBuilder
      bloc={adminUserBloc}
      builder={(state: AdminUserState) => {
        if (state instanceof AdminUserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof AdminUserListState) {
          return (
            <AdminBoardScreen
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

type Props = {
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
  users: User[];
};

const AdminBoardScreen: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <SectionTitle label={"Users"} style={{ marginTop: 10 }} />
      {props.users.map((user: User) => {
        return (
          <UserList
            key={user.id}
            user={user}
            updateUser={props.updateUser}
            deleteUser={props.deleteUser}
          />
        );
      })}
    </View>
  );
};

export default AdminBoardBloc;
