import React, { FC } from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import OauthCredentialsScreen from "../components/credentials/oauth-credentials";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./rootstack";

const Stack = createStackNavigator();

type CredentialsStackRouteProps = RouteProp<
  RootStackParamList,
  "OAuthCredentials"
>;

type CredentialsProps = {
  route: CredentialsStackRouteProps;
};

type Props = {
  serviceName: string;
};

const AppBar: FC<Props> = (props) => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction onPress={goBack} color={colors.primary} />
      <Appbar.Content
        title={props.serviceName}
        titleStyle={fonts.headerBarTitle}
      />
    </Appbar.Header>
  );
};

const OauthCredentialsStack: FC<CredentialsProps> = (props) => {
  const { serviceName } = props.route.params;
  return (
    <Stack.Navigator
      screenOptions={{ header: () => <AppBar serviceName={serviceName} /> }}
    >
      <Stack.Screen
        name={"OauthCredentials"}
        component={OauthCredentialsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default OauthCredentialsStack;
