import React, { FC } from "react";
import { RootStackParamList } from "./rootstack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Workflow } from "@area-common/types";
import WorkflowScreen from "../components/workflow/workflow";
import { Appbar, useTheme } from "react-native-paper";

export type WorkflowStackParamsList = {
  Workflow: { workflow: Workflow };
};

const Stack = createStackNavigator<WorkflowStackParamsList>();

const AppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction color={colors.primary} onPress={goBack} />
      <Appbar.Content title="Workflows" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

type WorkflowStackRouteProps = RouteProp<RootStackParamList, "Workflow">;

type Props = {
  route: WorkflowStackRouteProps;
};

const WorkflowStack: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ header: AppBar }}>
      <Stack.Screen
        name={"Workflow"}
        component={WorkflowScreen}
        initialParams={{ workflow: props.route.params.workflow }}
      />
    </Stack.Navigator>
  );
};

export default WorkflowStack;
