import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CredentialsScreen from "../components/credentials/credentials";
import { Appbar, useTheme } from "react-native-paper";

const Stack = createStackNavigator();

const CredentialsAppBar = () => {
  const { colors, fonts } = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Content title="Credentials" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const CredentialsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: CredentialsAppBar }}>
      <Stack.Screen name={"Credentials"} component={CredentialsScreen} />
    </Stack.Navigator>
  );
};

export default CredentialsStack;
