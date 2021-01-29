import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkflowsScreen from "../pages/workflows";
import CredentialsScreen from "../pages/credentials";
import SettingsScreen from "../pages/settings";

const Tab = createBottomTabNavigator();

const HomeStack: FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={"Workflows"} component={WorkflowsScreen} />
      <Tab.Screen name={"Credentials"} component={CredentialsScreen} />
      <Tab.Screen name={"Settings"} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default HomeStack;
