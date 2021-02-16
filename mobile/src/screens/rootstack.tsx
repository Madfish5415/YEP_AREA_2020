import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import HomeStack from "./home";
import Theme from "../theme";
import { Workflow } from "@area-common/types";
import WorkflowStack from "./workflow";

export type RootStackParamList = {
  Home: { userId: string };
  Workflow: { workflow: Workflow };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: FC = () => {
  return (
    <PaperProvider theme={Theme}>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator>
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
            initialParams={{ workflow: undefined }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootStack;
