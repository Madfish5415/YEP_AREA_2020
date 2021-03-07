import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Workflow, WorkflowNode } from "@area-common/types";
import { Appbar, useTheme } from "react-native-paper";
import ReactionNodeScreen from "../components/node/reaction/reaction-node";

export type ReactionNodeStackParamsList = {
  ReactionNode: {
    workflow: Workflow;
    updateWorkflow: (workflow: Workflow) => void;
    node?: WorkflowNode;
  };
};

const Stack = createStackNavigator<ReactionNodeStackParamsList>();

const AppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction color={colors.primary} onPress={goBack} />
      <Appbar.Content title={"Reaction"} titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const ReactionNodeStack: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: AppBar,
      }}
    >
      <Stack.Screen name={"ReactionNode"} component={ReactionNodeScreen} />
    </Stack.Navigator>
  );
};

export default ReactionNodeStack;
