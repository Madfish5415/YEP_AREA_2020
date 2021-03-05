import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Workflow } from "@area-common/types";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import WorkflowCreateScreen from "../components/workflow-create/workflow-create";

export type WorkflowCreateStackParamsList = {
  WorkflowCreate: {
    callback: (workflow: Workflow) => void;
  };
};

const Stack = createStackNavigator<WorkflowCreateStackParamsList>();

const AppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction color={colors.primary} onPress={goBack} />
      <Appbar.Content
        title={"New workflow"}
        titleStyle={fonts.headerBarTitle}
      />
    </Appbar.Header>
  );
};

const WorkflowCreateStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: AppBar }}>
      <Stack.Screen name={"WorkflowCreate"} component={WorkflowCreateScreen} />
    </Stack.Navigator>
  );
};

export default WorkflowCreateStack;
