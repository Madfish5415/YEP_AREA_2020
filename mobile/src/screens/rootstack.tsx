import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import HomeStack from "./home";
import Theme from "../theme";
import EpitechCredentialsStack from "./epitech-credentials";
import OAuthCredentialsStack from "./oauth-credentials";

export type RootStackParamList = {
  Home: { userId: string };
  EpitechCredentials: undefined;
  OAuthCredentials: { serviceName: string };
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
            name={"EpitechCredentials"}
            component={EpitechCredentialsStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"OAuthCredentials"}
            component={OAuthCredentialsStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootStack;
