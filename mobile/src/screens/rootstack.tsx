import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import HomeStack from "./home";
import Theme from "../theme";
import AccountSecurityStack from "./account-security";
import AdminBoardStack from "./admin-board";
import { Workflow, User } from "@area-common/types";
import WorkflowStack from "./workflow";
import SignUpScreen from "../components/signup/signup";
import SignInScreen from "../components/signin/signin";
import WorkflowCreateStack from "./workflow-create";
import AdminUserManageStack from "./admin-user-manage";
import AdminUserUpdateStack from "./admin-update-field";

export type RootStackParamList = {
  Home: { userId: string };
  Workflow: {
    workflow: Workflow;
    callback: (workflow: Workflow, updatedWorkflow: Partial<Workflow>) => void;
  };
  AdminUserManage: {
    user: User;
    updateUser: (id: string, updatedUser: Partial<User>) => void;
    deleteUser: (id: string) => void;
  };
  AdminUpdateField: {
    label: string;
    value: string;
    onSubmit: (value: string) => void;
  };
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
            name={"Workflow"}
            component={WorkflowStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"WorkflowCreate"}
            component={WorkflowCreateStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"AccountSecurity"}
            component={AccountSecurityStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"AdminBoard"}
            component={AdminBoardStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"AdminUserManage"}
            component={AdminUserManageStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={"AdminUpdateField"}
            component={AdminUserUpdateStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default RootStack;
