import React, { FC, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider, Text } from "react-native-paper";
import Theme from "../theme";
import SignUpScreen from "./signup";
import SignInScreen from "./signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Home: { userId: string };
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
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootStack;
