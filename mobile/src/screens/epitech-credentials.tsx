import React, { FC } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import EpitechCredentialsScreen from "../components/credentials/epitech-credentials";
import { RouteProp } from "@react-navigation/native";

export type EpitechCredentialsStackParamList = {
  EpitechCredentials: { userId: string };
};
const Stack = createStackNavigator<EpitechCredentialsStackParamList>();

type CredentialsStackRouteProps = RouteProp<
  EpitechCredentialsStackParamList,
  "EpitechCredentials"
>;

type CredentialsProps = {
  route: CredentialsStackRouteProps;
};

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

const EpitechCredentialsStack: FC<CredentialsProps> = (props) => {
  const { userId } = props.route.params;
  return (
    <Stack.Navigator screenOptions={{ header: AppBar }}>
      <Stack.Screen
        name={"EpitechCredentials"}
        component={EpitechCredentialsScreen}
        options={{ headerShown: true }}
        initialParams={{ userId: userId }}
      />
    </Stack.Navigator>
  );
};

export default EpitechCredentialsStack;
