import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import Theme from "../theme";
import HomeStack from "./home";
import SignInScreen from "./signin";
import SignUpScreen from "./signup";
import EpitechCredentialsStack from "./epitech-credentials";
import OAuthCredentialsStack from "./oauth-credentials";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: { userId: string };
  EpitechCredentials: undefined;
  OAuthCredentials: { serviceName: string; serviceId: string };
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
