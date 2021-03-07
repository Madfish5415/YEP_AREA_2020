import React, { FC } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import AdminManageBloc from "../components/admin-board/admin-manage";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./rootstack";
import { User } from "@area-common/types";

export type AdminUserManageStackParamList = {
  AdminUserManage: {
    user: User;
    updateUser: (id: string, updatedUser: Partial<User>) => void;
    deleteUser: (id: string) => void;
  };
};

const Stack = createStackNavigator<AdminUserManageStackParamList>();

type AdminUserStackRouteProps = RouteProp<
  RootStackParamList,
  "AdminUserManage"
>;

type AdminUserProps = {
  route: AdminUserStackRouteProps;
};

type Props = {
  userName: string;
};

const AppBar: FC<Props> = (props) => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction onPress={goBack} color={colors.primary} />
      <Appbar.Content
        title={props.userName}
        titleStyle={fonts.headerBarTitle}
      />
    </Appbar.Header>
  );
};

const AdminUserManageStack: FC<AdminUserProps> = (props) => {
  const { user } = props.route.params;
  return (
    <Stack.Navigator
      screenOptions={{ header: () => <AppBar userName={user.username} /> }}
    >
      <Stack.Screen
        name={"AdminUserManage"}
        component={AdminManageBloc}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default AdminUserManageStack;
