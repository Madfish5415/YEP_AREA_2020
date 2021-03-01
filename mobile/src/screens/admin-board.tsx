import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AdminBoardScreen from "../components/admin-board/admin-board";

const Stack = createStackNavigator();

const AppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.BackAction onPress={goBack} color={colors.primary} />
      <Appbar.Content title="Admin board" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

const AdminBoardStack: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ header: AppBar }}>
      <Stack.Screen name={"AdminBoard"} component={AdminBoardScreen} />
    </Stack.Navigator>
  );
};

export default AdminBoardStack;
