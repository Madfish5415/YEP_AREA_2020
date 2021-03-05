import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { FC } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import Theme from "../theme";
import { Workflow } from "@area-common/types";
import WorkflowStack from "./workflow";
import HomeStack from "./home";
import SignInScreen from "./signin";
import SignUpScreen from "./signup";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
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
            initialParams={{ userId: "3dcf9a69-e258-4449-a41d-cea7f6ca3fa9" }}
          />
          <Stack.Screen
            name={"Workflow"}
            component={WorkflowStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootStack;
