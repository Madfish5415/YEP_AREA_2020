import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import WorkflowsActiveScreen from "../components/workflows/workflows-active";
import WorkflowsEditScreen from "../components/workflows/workflows-edit";

const add = ({ color }) => <MaterialIcons name="add" size={25} color={color} />;

const pencil = ({ color }) => (
  <MaterialIcons name="edit" size={25} color={color} />
);

const WorkflowsActiveAppBar = () => {
  const { colors, fonts } = useTheme();
  const { navigate } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Action
        icon={pencil}
        onPress={() => navigate("WorkflowsEdit", { screen: "WorkflowsEdit" })}
        color={colors.primary}
      />
      <Appbar.Content title="Workflows" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const WorkflowsActiveStackRoute = createStackNavigator();

const WorkflowsActiveStack: FC = () => {
  return (
    <WorkflowsActiveStackRoute.Navigator
      screenOptions={{ header: WorkflowsActiveAppBar }}
    >
      <WorkflowsActiveStackRoute.Screen
        name={"WorkflowsActive"}
        component={WorkflowsActiveScreen}
      />
    </WorkflowsActiveStackRoute.Navigator>
  );
};

const close = ({ color }) => (
  <Ionicon name="ios-close" size={25} color={color} />
);

const WorkflowsEditAppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Action icon={close} onPress={goBack} color={colors.primary} />
      <Appbar.Content title="Workflows" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const WorkflowsEditStackRoute = createStackNavigator();

const WorkflowsEditStack: FC = () => {
  return (
    <WorkflowsEditStackRoute.Navigator
      screenOptions={{ header: WorkflowsEditAppBar }}
    >
      <WorkflowsEditStackRoute.Screen
        name={"WorkflowsEdit"}
        component={WorkflowsEditScreen}
      />
    </WorkflowsEditStackRoute.Navigator>
  );
};

const WorkflowsStackRoute = createStackNavigator();

const WorkflowsStack: FC = () => {
  return (
    <WorkflowsStackRoute.Navigator screenOptions={{ headerShown: false }}>
      <WorkflowsStackRoute.Screen
        name={"WorkflowsActive"}
        component={WorkflowsActiveStack}
        options={{ animationEnabled: false }}
      />
      <WorkflowsStackRoute.Screen
        name={"WorkflowsEdit"}
        component={WorkflowsEditStack}
        options={{ animationEnabled: false }}
      />
    </WorkflowsStackRoute.Navigator>
  );
};

export default WorkflowsStack;
