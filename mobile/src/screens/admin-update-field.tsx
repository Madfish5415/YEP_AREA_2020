import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import AdminUserUpdateScreen from "../components/admin-board/admin-update";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./rootstack";

export type AdminUpdateFieldStackParamList = {
  AdminUpdateField: {
    label: string;
    value: string;
    onSubmit: (value: string) => void;
  };
};

const Stack = createStackNavigator<AdminUpdateFieldStackParamList>();

type AdminUpdateStackRouteProps = RouteProp<
  RootStackParamList,
  "AdminUpdateField"
>;

type AdminUpdateProps = {
  route: AdminUpdateStackRouteProps;
};

type Props = {
  label: string;
};

const AppBar: FC<Props> = (props) => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction onPress={goBack} color={colors.primary} />
      <Appbar.Content title={props.label} titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const AdminUserUpdateStack: FC<AdminUpdateProps> = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <AppBar label={props.route.params.label} />,
      }}
    >
      <Stack.Screen
        name={"AdminUpdateField"}
        component={AdminUserUpdateScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AdminUserUpdateStack;
