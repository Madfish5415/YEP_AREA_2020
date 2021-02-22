import React, { FC } from "react";
import { StyleSheet, TextInput } from "react-native";
import { RootStackParamList } from "./rootstack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Workflow } from "@area-common/types";
import WorkflowScreen from "../components/workflow/workflow";
import { Appbar, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  headerTextInput: {
    width: "76%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
});

type update = (workflow: Workflow, updatedWorkflow: Partial<Workflow>) => void;
type create = (workflow: Workflow) => void;

export type WorkflowStackParamsList = {
  Workflow: {
    workflow: Workflow;
    callback: update | create;
    isEditing: boolean;
  };
};

const Stack = createStackNavigator<WorkflowStackParamsList>();

type AppBarProps = {
  workflow: Workflow;
  callback: (workflow: Workflow, updatedWorkflow: Partial<Workflow>) => void;
};

const AppBar: FC<AppBarProps> = (props) => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction color={colors.primary} onPress={goBack} />
      <TextInput
        defaultValue={props.workflow.name}
        style={[styles.headerTextInput, fonts.headerBarTitle]}
        onChangeText={(text) => props.callback(props.workflow, { name: text })}
      />
    </Appbar.Header>
  );
};

type WorkflowStackRouteProps = RouteProp<RootStackParamList, "Workflow">;

type Props = {
  route: WorkflowStackRouteProps;
};

const WorkflowStack: FC<Props> = (props) => {
  const { workflow, callback } = props.route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <AppBar workflow={workflow} callback={callback} />,
      }}
    >
      <Stack.Screen name={"Workflow"} component={WorkflowScreen} />
    </Stack.Navigator>
  );
};

export default WorkflowStack;
