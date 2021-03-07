import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Workflow, WorkflowNode } from "@area-common/types";
import { Appbar, useTheme } from "react-native-paper";
import OperatorNodeScreen from "../components/node/operator/operator-node";

export type OperatorNodeStackParamsList = {
  OperatorNode: {
    workflow: Workflow;
    updateWorkflow: (workflow: Workflow) => void;
    node?: WorkflowNode;
  };
};

const Stack = createStackNavigator<OperatorNodeStackParamsList>();

const AppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction color={colors.primary} onPress={goBack} />
      <Appbar.Content title={"Operator"} titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const OperatorNodeStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: AppBar,
      }}
    >
      <Stack.Screen name={"OperatorNode"} component={OperatorNodeScreen} />
    </Stack.Navigator>
  );
};

export default OperatorNodeStack;
