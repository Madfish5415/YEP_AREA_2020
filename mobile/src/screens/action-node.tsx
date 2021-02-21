import React, { FC } from "react";
import { StyleSheet, TextInput } from "react-native";
import { RootStackParamList } from "./rootstack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Workflow, WorkflowAction } from "@area-common/types";
import WorkflowScreen from "../components/workflow/workflow";
import { Appbar, useTheme } from "react-native-paper";
import { ActionNodeScreen } from "../components/node/action/action-node";

const styles = StyleSheet.create({
  headerTextInput: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
});

export type ActionNodeStackParamsList = {
  ActionNode: {
    workflow: Workflow;
    updateActionCallback: (workflow: Workflow, action: WorkflowAction) => void;
  };
};

const Stack = createStackNavigator<ActionNodeStackParamsList>();

type AppBarProps = {
  workflow: Workflow;
  callback: (workflow: Workflow, action: WorkflowAction) => void;
};

const AppBar: FC<AppBarProps> = (props) => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction color={colors.primary} onPress={goBack} />
      <TextInput
        defaultValue={props.workflow.action.action.name}
        style={[styles.headerTextInput, fonts.headerBarTitle]}
        onSubmitEditing={(event) =>
          props.callback(props.workflow, {
            ...props.workflow,
            action: {
              ...props.workflow.action.action,
              name: event.nativeEvent.text,
            },
          })
        }
      />
    </Appbar.Header>
  );
};

type ActionNodeStackRouteParams = RouteProp<RootStackParamList, "ActionNode">;

type Props = {
  route: ActionNodeStackRouteParams;
};

const ActionNodeStack: FC<Props> = (props) => {
  const { workflow, callback } = props.route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <AppBar workflow={workflow} callback={callback} />,
      }}
    >
      <Stack.Screen name={"ActionNode"} component={ActionNodeScreen} />
    </Stack.Navigator>
  );
};

export default ActionNodeStack;
