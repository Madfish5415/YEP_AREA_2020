import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Workflows from "../components/workflows/workflows";

const Stack = createStackNavigator();

const WorkflowsScreen: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Workflow"} component={Workflows} />
    </Stack.Navigator>
  );
};

export default WorkflowsScreen;
