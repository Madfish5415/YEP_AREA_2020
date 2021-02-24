import React, { FC } from "react";
import { User } from "@area-common/types";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AccountSecurityScreen from "../components/account-security/account-security";

export type AccountSecurityStackParamsList = {
  AccountSecurity: {
    user: User;
    updateCallback: (user: User, partialUser: Partial<User>) => void;
  };
};

const Stack = createStackNavigator<AccountSecurityStackParamsList>();

const AppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction onPress={goBack} color={colors.primary} />
      <Appbar.Content
        title="Account security"
        titleStyle={fonts.headerBarTitle}
      />
    </Appbar.Header>
  );
};

const AccountSecurityStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: AppBar }}>
      <Stack.Screen
        name={"AccountSecurity"}
        component={AccountSecurityScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountSecurityStack;
