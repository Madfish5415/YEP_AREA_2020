import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../components/settings/settings";
import { Appbar, useTheme } from "react-native-paper";

export type SettingsStackParamsList = {};

const Stack = createStackNavigator<SettingsStackParamsList>();

const SettingsAppBar = () => {
  const { colors, fonts } = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Content title="Settings" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const SettingsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: SettingsAppBar }}>
      <Stack.Screen name={"Settings"} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
