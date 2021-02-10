import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WorkflowsScreen from "../components/workflows/workflows";
import { Appbar, useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Stack = createStackNavigator();

const add = ({ color }) => <MaterialIcons name="add" size={25} color={color} />;

const pencil = ({ color }) => (
  <MaterialIcons name="edit" size={25} color={color} />
);

const WorkflowsAppBar = () => {
  const { colors, fonts } = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Action
        icon={pencil}
        onPress={() => alert("Todo!")}
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

const WorkflowsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: WorkflowsAppBar }}>
      <Stack.Screen name={"Workflows"} component={WorkflowsScreen} />
    </Stack.Navigator>
  );
};

export default WorkflowsStack;
