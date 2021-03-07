import React, { FC, useState } from "react";
import { AdminUserManageStackParamList } from "../../screens/admin-user-manage";
import { RouteProp } from "@react-navigation/native";
import { Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { getLocalStorage } from "../../common/localStorage";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { BlocBuilder } from "@felangel/react-bloc";
import { User, Account } from "@area-common/types";
import { SectionTitle } from "../common/section-title";
import { View } from "react-native";
import UpdateUserField from "./update-user";
import { primary, gray } from "@area-common/styles";
import Ionicons from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 40,
    borderTopColor: gray.light2,
    borderTopWidth: 1,
    borderBottomColor: gray.light2,
    borderBottomWidth: 1,
  },
  nameText: {
    color: primary.main,
  },
  elements: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
});

type AdminManageStackRouteProps = RouteProp<
  AdminUserManageStackParamList,
  "AdminUserManage"
>;

type AdminManageProps = {
  route: AdminManageStackRouteProps;
};

const AdminManageBloc: FC<AdminManageProps> = (props) => {
  const adminAccountBloc = new AdminAccountBloc(
    new AdminAccountRepository("http://localhost:8080")
  );
  const { navigate } = useNavigation();
  getLocalStorage("@userToken")
    .then((userToken) => {
      if (userToken) {
        adminAccountBloc.add(
          new AdminAccountReadEvent(userToken, props.route.params.user.id)
        );
      } else {
        navigate("SignIn");
      }
    })
    .catch((error) => console.log("error:", error));

  const updateAccount = (id: string, account: Partial<Account>) => {
    getLocalStorage("@userToken")
      .then((userToken) => {
        if (userToken) {
          adminAccountBloc.add(
            new AdminAccountUpdateEvent(userToken, id, account)
          );
          adminAccountBloc.add(new AdminAccountReadEvent(userToken, id));
        } else {
          navigate("SignIn");
        }
      })
      .catch((error) => console.log("error:", error));
  };
  return (
    <BlocBuilder
      bloc={adminAccountBloc}
      builder={(state: AdminAccountState) => {
        if (state instanceof AdminAccountErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof AdminAccountReadState) {
          return (
            <AdminUserManageScreen
              user={props.route.params.user}
              updateUser={props.route.params.updateUser}
              deleteUser={props.route.params.deleteUser}
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

const AdminUserManageScreen: FC<Props> = (props) => {
  const updateUsername = (username: string) => {
    props.updateUser(props.user.id, { username: username });
  };

  const updateFirstName = (firstName: string) => {
    props.updateUser(props.user.id, { firstName: firstName });
  };

  const updateLastName = (lastName: string) => {
    props.updateUser(props.user.id, { lastName: lastName });
  };

  const updateEmail = (email: string) => {
    props.updateAccount(props.user.id, { email: email });
  };

  const switchEmailVerification = () => {
    //props.updateAccount(props.user.id, { verified: !props.account.verified });
  };
  return (
    <View>
      <SectionTitle label={"Actions"} style={{ marginTop: 10 }} />
      <UpdateUserField
        user={props.user}
        account={props.account}
        label={"Change email"}
        isVerify={false}
        value={props.account.email}
        onSubmit={updateEmail}
      />
      <UpdateUserField
        user={props.user}
        account={props.account}
        label={"Change username"}
        isVerify={false}
        value={props.user.username}
        onSubmit={updateUsername}
      />
      <UpdateUserField
        user={props.user}
        account={props.account}
        label={"Change first name"}
        isVerify={false}
        value={props.user.firstName ? props.user.firstName : ""}
        onSubmit={updateFirstName}
      />
      <UpdateUserField
        user={props.user}
        account={props.account}
        label={"Change last name"}
        isVerify={false}
        value={props.user.lastName ? props.user.lastName : ""}
        onSubmit={updateLastName}
      />
      <UpdateUserField
        user={props.user}
        account={props.account}
        label={"Verify email"}
        isVerify={true}
        onSubmit={switchEmailVerification}
      />
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Delete user", props.user.username, [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => props.deleteUser(props.user.id),
              style: "destructive",
            },
          ]);
        }}
        style={styles.container}
      >
        <View style={styles.elements}>
          <Text style={styles.nameText}>Delete user</Text>
          <Ionicons name={"chevron-forward"} size={24} color={gray.light1} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdminManageBloc;
