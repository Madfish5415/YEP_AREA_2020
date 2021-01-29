import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../components/settings/settings";

const Stack = createStackNavigator();

const SettingsScreen: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Settings"} component={Settings} />
    </Stack.Navigator>
  );
};

export default SettingsScreen;
