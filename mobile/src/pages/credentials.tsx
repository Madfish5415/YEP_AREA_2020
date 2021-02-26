import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CredentialsScreen from "../components/credentials/credentials";
import { Appbar, useTheme } from "react-native-paper";
import { TabParamsList } from "../screens/home";
import { RouteProp } from "@react-navigation/native";

export type CredentialsStackParamsList = {
  Credentials: { userId: string };
};
const Stack = createStackNavigator<CredentialsStackParamsList>();

const CredentialsAppBar = () => {
  const { colors, fonts } = useTheme();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Content title="Credentials" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

type CredentialsRootProps = RouteProp<TabParamsList, "Credentials">;

type Props = {
  route: CredentialsRootProps;
};

const CredentialsStack: FC<Props> = (props) => {
  const { userId } = props.route.params;
  return (
    <Stack.Navigator screenOptions={{ header: CredentialsAppBar }}>
      <Stack.Screen
        name={"Credentials"}
        component={CredentialsScreen}
        initialParams={{ userId: userId }}
      />
    </Stack.Navigator>
  );
};

export default CredentialsStack;
