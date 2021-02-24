import React, { FC, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { AccountSecurityStackParamsList } from "../../screens/account-security";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { UpdatePasswordButton } from "./update-password-button";

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

const AccountSecurityScreen: FC<AccountSecurityProps> = (props) => {
  const { user, updateCallback } = props.route.params;
  const [email, setEmail] = useState("johnDoe@gmail.com");

  return (
    <View style={styles.container}>
      <SectionTitle label={"Email"} style={{ marginTop: 5 }} />
      <CustomTextInput text={email} setText={setEmail} />
      <SectionTitle label={"Old password"} style={{ marginTop: 20 }} />
      <CustomTextInput text={email} setText={setEmail} />
      <SectionTitle label={"New password"} style={{ marginTop: 20 }} />
      <CustomTextInput text={email} setText={setEmail} />
      <SectionTitle label={"Confirm password"} style={{ marginTop: 20 }} />
      <CustomTextInput text={email} setText={setEmail} />
      <UpdatePasswordButton callback={updateCallback} />
    </View>
  );
};

export default AccountSecurityScreen;
