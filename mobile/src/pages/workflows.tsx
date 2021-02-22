import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, useTheme } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import WorkflowsActiveScreen from "../components/workflows/workflows-active";
import WorkflowsEditScreen from "../components/workflows/workflows-edit";
import { RouteProp } from "@react-navigation/native";
import { TabParamsList } from "../screens/home";

const add = ({ color }) => <MaterialIcons name="add" size={25} color={color} />;

const pencil = ({ color }) => (
  <MaterialIcons name="edit" size={25} color={color} />
);

const WorkflowsActiveAppBar = () => {
  const { colors, fonts } = useTheme();
  const { navigate } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Action
        icon={pencil}
        onPress={() => navigate("WorkflowsEdit", { screen: "WorkflowsEdit" })}
        color={colors.primary}
      />
      <Appbar.Content title="Workflows" titleStyle={fonts.headerBarTitle} />
      <Appbar.Action
        icon={add}
        onPress={() => navigate("NewWorkflow", { screen: "NewWorkflow" })}
        color={colors.primary}
      />
    </Appbar.Header>
  );
};

export type WorkflowsActiveStackRouteParamsList = {
  WorkflowsActive: { userId: string };
};

const WorkflowsActiveStackRoute = createStackNavigator<WorkflowsActiveStackRouteParamsList>();

type WorkflowsActiveStackRouteProps = RouteProp<
  WorkflowsStackRouteParamsList,
  "WorkflowsActive"
>;

type WorkflowsActiveProps = {
  route: WorkflowsActiveStackRouteProps;
};

const WorkflowsActiveStack: FC<WorkflowsActiveProps> = (props) => {
  const { userId } = props.route.params;
  return (
    <WorkflowsActiveStackRoute.Navigator
      screenOptions={{ header: WorkflowsActiveAppBar }}
    >
      <WorkflowsActiveStackRoute.Screen
        name={"WorkflowsActive"}
        component={WorkflowsActiveScreen}
        initialParams={{ userId: userId }}
      />
    </WorkflowsActiveStackRoute.Navigator>
  );
};

const close = ({ color }) => (
  <Ionicon name="ios-close" size={25} color={color} />
);

const WorkflowsEditAppBar = () => {
  const { colors, fonts } = useTheme();
  const { goBack } = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
      <Appbar.Action icon={close} onPress={goBack} color={colors.primary} />
      <Appbar.Content title="Workflows" titleStyle={fonts.headerBarTitle} />
    </Appbar.Header>
  );
};

type WorkflowsEditStackRouteParamsList = {
  WorkflowsEdit: { userId: string };
};

const WorkflowsEditStackRoute = createStackNavigator<WorkflowsEditStackRouteParamsList>();

type WorkflowsEditStackRouteProps = RouteProp<
  WorkflowsStackRouteParamsList,
  "WorkflowsEdit"
>;

type WorkflowsEditProps = {
  route: WorkflowsEditStackRouteProps;
};

const WorkflowsEditStack: FC<WorkflowsEditProps> = (props) => {
  const { userId } = props.route.params;
  return (
    <WorkflowsEditStackRoute.Navigator
      screenOptions={{ header: WorkflowsEditAppBar }}
    >
      <WorkflowsEditStackRoute.Screen
        name={"WorkflowsEdit"}
        component={WorkflowsEditScreen}
        initialParams={{ userId: userId }}
      />
    </WorkflowsEditStackRoute.Navigator>
  );
};

type WorkflowsStackRouteParamsList = {
  WorkflowsActive: { userId: string };
  WorkflowsEdit: { userId: string };
};

const WorkflowsStackRoute = createStackNavigator<WorkflowsStackRouteParamsList>();

type WorkflowsStackRouteProps = RouteProp<TabParamsList, "Workflows">;

type WorkflowsProps = {
  route: WorkflowsStackRouteProps;
};

const WorkflowsStack: FC<WorkflowsProps> = (props) => {
  const { userId } = props.route.params;
  return (
    <WorkflowsStackRoute.Navigator screenOptions={{ headerShown: false }}>
      <WorkflowsStackRoute.Screen
        name={"WorkflowsActive"}
        component={WorkflowsActiveStack}
        options={{ animationEnabled: false }}
        initialParams={{ userId: userId }}
      />
      <WorkflowsStackRoute.Screen
        name={"WorkflowsEdit"}
        component={WorkflowsEditStack}
        options={{ animationEnabled: false }}
        initialParams={{ userId: userId }}
      />
    </WorkflowsStackRoute.Navigator>
  );
};

export default WorkflowsStack;
