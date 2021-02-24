import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../components/settings/settings";
import { Appbar, useTheme } from "react-native-paper";
import { TabParamsList } from "../screens/home";
import { RouteProp } from "@react-navigation/native";

type SettingsStackRouteProps = RouteProp<TabParamsList, "Settings">;

type Props = {
  route: SettingsStackRouteProps;
};

export type SettingsStackParamsList = {
  Settings: { userId: string };
};

const Stack = createStackNavigator<SettingsStackParamsList>();

const SettingsAppBar = () => {
  const { colors, fonts } = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Content title="Settings" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const SettingsStack: FC<Props> = (props) => {
  const { userId } = props.route.params;
  return (
    <Stack.Navigator screenOptions={{ header: SettingsAppBar }}>
      <Stack.Screen
        name={"Settings"}
        component={SettingsScreen}
        initialParams={{ userId: userId }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
