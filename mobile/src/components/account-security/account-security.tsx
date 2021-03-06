import React, { FC, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { AccountSecurityStackParamsList } from "../../screens/account-security";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { UpdatePasswordButton } from "./update-password-button";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  AuthenticationBloc,
  AccountBloc,
  AccountErrorState,
  AccountReadEvent,
  AccountReadState,
  AccountRepository,
  AccountUpdateEvent,
  UserLoadingState,
} from "@area-common/blocs";
import { getLocalStorage } from "../../common/localStorage";
import { ErrorState } from "../blocbuilder/error-state";
import { DefaultState } from "../blocbuilder/default-state";
import { useNavigation } from "@react-navigation/native";
import { Account } from "@area-common/types";
import { v4 as uuidv4 } from "uuid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

type AccountSecurityRouteProps = RouteProp<
  AccountSecurityStackParamsList,
  "AccountSecurity"
>;

type AccountSecurityProps = {
  route: AccountSecurityRouteProps;
};

type Props = {
  account: Account;
  update: (account: Partial<Account>) => void;
};

const AccountSecurityBloc: FC<AccountSecurityProps> = (props) => {
  const accountBloc = new AccountBloc(
    new AccountRepository("http://localhost:8080")
  );
  const { navigate } = useNavigation();
  const { user, updateCallback } = props.route.params;
  const [token, setToken] = useState("");

  getLocalStorage("@userToken")
    .then((userToken) => {
      if (userToken) {
        accountBloc.add(new AccountReadEvent(userToken));
        setToken(userToken);
      } else {
        navigate("SignIn");
      }
    })
    .catch((error) => console.log(error));

  const updateAccountInfos = (account: Partial<Account>) => {
    getLocalStorage("@userToken")
      .then((data) => {
        accountBloc.add(new AccountUpdateEvent(data as string, account));
        accountBloc.add(new AccountReadEvent(data as string));
      })
      .catch((error) => console.log(error));
  };
  return (
    <BlocBuilder
      key={uuidv4()}
      bloc={accountBloc}
      builder={(state) => {
        if (state instanceof AccountErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof AccountReadState) {
          return (
            <AccountSecurityScreen
              account={state.account}
              update={updateAccountInfos}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

const AccountSecurityScreen: FC<Props> = (props) => {
  const [email, setEmail] = useState(props.account.email);
  const [oldPassword, setOldPassWord] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  return (
    <View style={styles.container}>
      <SectionTitle label={"Email"} style={{ marginTop: 5 }} />
      <CustomTextInput
        text={email}
        setText={setEmail}
        onSubmitEditing={() => props.update({ email: email })}
      />
      <SectionTitle label={"Old password"} style={{ marginTop: 20 }} />
      <CustomTextInput text={oldPassword} setText={setOldPassWord} />
      <SectionTitle label={"New password"} style={{ marginTop: 20 }} />
      <CustomTextInput text={password} setText={setPassword} />
      <SectionTitle label={"Confirm password"} style={{ marginTop: 20 }} />
      <CustomTextInput text={passwordRepeat} setText={setPasswordRepeat} />
      <UpdatePasswordButton callback={() => alert("Todo")} />
    </View>
  );
};

export default AccountSecurityBloc;
