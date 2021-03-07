import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import HomeStack from "./home";
import Theme from "../theme";
import { Workflow } from "@area-common/types";
import WorkflowStack from "./workflow";
import SignUpScreen from "../components/signup/signup";
import SignInScreen from "../components/signin/signin";
import WorkflowCreateStack from "./workflow-create";
import ActionNodeStack from "./action-node";
import OperatorNodeStack from "./operator-node";
import ReactionNodeStack from "./reaction-node";

export type RootStackParamList = {
  Home: { userId: string };
  Workflow: {
    workflow: Workflow;
    callback: (workflow: Workflow, updatedWorkflow: Partial<Workflow>) => void;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: FC = () => {
  return (
    <PaperProvider theme={Theme}>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator>
          <Stack.Screen
            name={"SignIn"}
            component={SignInScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"SignUp"}
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"Home"}
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"Workflow"}
            component={WorkflowStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"WorkflowCreate"}
            component={WorkflowCreateStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"ActionNode"}
            component={ActionNodeStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"OperatorNode"}
            component={OperatorNodeStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"ReactionNode"}
            component={ReactionNodeStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootStack;
