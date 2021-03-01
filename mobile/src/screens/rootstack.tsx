import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import HomeStack from "./home";
import Theme from "../theme";
import AccountSecurityStack from "./account-security";
import AdminBoardStack from "./admin-board";

export type RootStackParamList = {
  Home: { userId: string };
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
            name={"AccountSecurity"}
            component={AccountSecurityStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"AdminBoard"}
            component={AdminBoardStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootStack;
