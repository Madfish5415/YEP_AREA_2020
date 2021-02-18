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
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
});

export type WorkflowStackParamsList = {
  Workflow: { workflow: Workflow };
};

const Stack = createStackNavigator<WorkflowStackParamsList>();

type AppBarProps = {
  name: string;
};

const AppBar: FC<AppBarProps> = (props) => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction color={colors.primary} onPress={goBack} />
      <TextInput
        defaultValue={props.name}
        style={[styles.headerTextInput, fonts.headerBarTitle]}
      />
    </Appbar.Header>
  );
};

type WorkflowStackRouteProps = RouteProp<RootStackParamList, "Workflow">;

type Props = {
  route: WorkflowStackRouteProps;
};

const WorkflowStack: FC<Props> = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <AppBar name={props.route.params.workflow.name} />,
      }}
    >
      <Stack.Screen name={"Workflow"} component={WorkflowScreen} />
    </Stack.Navigator>
  );
};

export default WorkflowStack;
