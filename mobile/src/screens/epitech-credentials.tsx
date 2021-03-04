import React, { FC } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import EpitechCredentialsScreen from "../components/credentials/epitech-credentials";

const Stack = createStackNavigator();

const AppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction onPress={goBack} color={colors.primary} />
      <Appbar.Content title="Epitech" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const EpitechCredentialsStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: AppBar }}>
      <Stack.Screen
        name={"EpitechCredentials"}
        component={EpitechCredentialsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default EpitechCredentialsStack;
