import React, { FC } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import WorkflowsStack from "../pages/workflows";
import CredentialsStack from "../pages/credentials";
import SettingsStack from "../pages/settings";
import { useTheme } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "./rootstack";

type HomeStackRouteProps = RouteProp<RootStackParamList, "Home">;

type Props = {
  route: HomeStackRouteProps;
};

export type TabParamsList = {
  Workflows: { userId: string };
  credentials: { userId: string };
  Settings: { userId: string };
};

const Tab = createMaterialBottomTabNavigator<TabParamsList>();

const HomeStack: FC<Props> = (props: Props) => {
  const { colors } = useTheme();
  const { userId } = props.route.params;
  return (
    <Tab.Navigator
      activeColor={colors.primary}
      inactiveColor={colors.inactive}
      barStyle={{ backgroundColor: colors.background }}
      labeled={false}
    >
      <Tab.Screen
        name={"Workflows"}
        component={WorkflowsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="sitemap" size={25} color={color} />
          ),
        }}
        initialParams={{ userId: userId }}
      />
      <Tab.Screen
        name={"Credentials"}
        component={CredentialsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="key-variant"
              size={25}
              color={color}
            />
          ),
        }}
        initialParams={{ userId: userId }}
      />
      <Tab.Screen
        name={"Settings"}
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="cog" size={24} color={color} />
          ),
        }}
        initialParams={{ userId: userId }}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
