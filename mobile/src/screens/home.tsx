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
import {
  UserBloc,
  UserErrorState,
  UserGetEvent,
  UserGetState,
  UserRepository,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { User } from "@area-common/types";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

type HomeStackRouteProps = RouteProp<RootStackParamList, "Home">;

type Props = {
  route: HomeStackRouteProps;
};

const HomeStack: FC<Props> = (props: Props) => {
  const userBloc = new UserBloc(new UserRepository("http://localhost:8080"));
  userBloc.add(new UserGetEvent(props.route.params.userId));

  return (
    <BlocBuilder
      bloc={userBloc}
      builder={(state) => {
        if (state instanceof UserErrorState) {
          return <ErrorState />;
        }
        if (state instanceof UserGetState) {
          return <GetState user={state.user} />;
        }

        return <DefaultState />;
      }}
    />
  );
};

const DefaultState: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size={"large"} />
    </View>
  );
};

const ErrorState: FC = () => {
  const text = "An error has occurred";

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

export type TabParamsList = {
  Workflows: { user: User };
  credentials: { user: User };
  Settings: { user: User };
};

const Tab = createMaterialBottomTabNavigator<TabParamsList>();

type GetProps = {
  user: User;
};

const GetState: FC<GetProps> = (props) => {
  const { colors } = useTheme();
  const { user } = props;

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
        initialParams={{ user: user }}
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
        initialParams={{ user: user }}
      />
      <Tab.Screen
        name={"Settings"}
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="cog" size={24} color={color} />
          ),
        }}
        initialParams={{ user: user }}
      />
    </Tab.Navigator>
  );
};

export default HomeStack;
