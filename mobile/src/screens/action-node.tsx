import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Workflow, WorkflowNode } from "@area-common/types";
import { Appbar, useTheme } from "react-native-paper";
import ActionNodeScreen from "../components/node/action/action-node";

export type ActionNodeStackParamsList = {
  ActionNode: {
    workflow: Workflow;
    updateWorkflow: (workflow: Workflow) => void;
    node?: WorkflowNode;
  };
};

const Stack = createStackNavigator<ActionNodeStackParamsList>();

const AppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction color={colors.primary} onPress={goBack} />
      <Appbar.Content title={"Action"} titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const ActionNodeStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: AppBar,
      }}
    >
      <Stack.Screen name={"ActionNode"} component={ActionNodeScreen} />
    </Stack.Navigator>
  );
};

export default ActionNodeStack;
