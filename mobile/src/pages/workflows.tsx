import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import WorkflowsActiveScreen from "../components/workflows/workflows-active";
import WorkflowsEditScreen from "../components/workflows/workflows-edit";
import { Animated } from "react-native";

const Stack = createStackNavigator();

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
      <Appbar.Action
        icon={add}
        onPress={() => alert("Todo!")}
        color={colors.primary}
      />
    </Appbar.Header>
  );
};

const WorkflowsActiveStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: WorkflowsActiveAppBar }}>
      <Stack.Screen
        name={"WorkflowsActive"}
        component={WorkflowsActiveScreen}
      />
    </Stack.Navigator>
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

const WorkflowsEditStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: WorkflowsEditAppBar }}>
      <Stack.Screen name={"WorkflowsEdit"} component={WorkflowsEditScreen} />
    </Stack.Navigator>
  );
};

const WorkflowsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={"WorkflowsActive"}
        component={WorkflowsActiveStack}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name={"WorkflowsEdit"}
        component={WorkflowsEditStack}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default WorkflowsStack;
