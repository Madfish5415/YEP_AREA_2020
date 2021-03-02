import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import Service from "./service";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { primary, gray } from "@area-common/styles";
import {
  UserBloc,
  UserErrorState,
  UserGetEvent,
  UserGetState,
  UserRepository,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { RouteProp } from "@react-navigation/native";
import { CredentialsStackParamsList } from "../../pages/credentials";
import { User } from "@area-common/types";
import { AuthConfiguration } from "react-native-app-auth";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: gray.main,
    marginTop: 10,
  },
  text: {
    fontSize: 50,
    color: primary.main,
    fontWeight: "bold",
  },
});

type CredentialsRootProps = RouteProp<
  CredentialsStackParamsList,
  "Credentials"
>;

type CredentialsProps = {
  route: CredentialsRootProps;
};

const CredentialsScreen: FC<CredentialsProps> = (props) => {
  const userBloc = new UserBloc(new UserRepository(""));
  userBloc.add(new UserGetEvent(props.route.params.userId));
  return (
    <BlocBuilder
      bloc={userBloc}
      builder={(state) => {
        if (state instanceof UserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof UserGetState) {
          return <Credentials user={state.user} />;
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  user: User;
};

export type ConfigProps = {
  issuer: string;
  clientID: string;
  redirectURL: string;
  scopes: string[];
};

const oAuthConfigMap = new Map<string, AuthConfiguration>([
  [
    "google",
    {
      issuer: "https://accounts.google.com",
      clientId:
        "627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal.apps.googleusercontent.com",
      redirectUrl:
        "com.googleusercontent.apps.627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal:/credentials",
      scopes: ["https://www.googleapis.com/auth/youtube"],
    },
  ],
  [
    "github",
    {
      redirectUrl:
        "627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal.apps.googleusercontent.com:/credentials",
      clientId: "8581958e9dae37e30f77",
      clientSecret: "9ed0766602121c709c8c3275034316fba97b42b1",
      scopes: ["identity"],
      serviceConfiguration: {
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
        tokenEndpoint: "https://github.com/login/oauth/access_token",
        revocationEndpoint:
          "https://github.com/settings/connections/applications/8581958e9dae37e30f77",
      },
    },
  ],
]);

const Credentials: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Service
        name={"Instagram"}
        icon={<FontAwesome size={50} name={"instagram"} color={primary.main} />}
        isEpitech={false}
        user={props.user}
        isLoggedIn={false}
      />
      <Service
        name={"Office 365"}
        icon={
          <MaterialCommunityIcons
            size={50}
            name={"microsoft-office"}
            color={primary.main}
          />
        }
        isEpitech={false}
        user={props.user}
        isLoggedIn={true}
      />
      <Service
        name={"Github"}
        icon={<FontAwesome size={50} name={"github"} color={primary.main} />}
        isEpitech={false}
        user={props.user}
        isLoggedIn={false}
        oAuthConfig={oAuthConfigMap.get("github")}
      />
      <Service
        name={"Discord"}
        icon={<Fontisto size={50} name={"discord"} color={primary.main} />}
        isEpitech={false}
        user={props.user}
        isLoggedIn={false}
        oAuthConfig={oAuthConfigMap.get("google")}
      />
      <Service
        name={"Youtube"}
        icon={
          <FontAwesome size={50} name={"youtube-play"} color={primary.main} />
        }
        isEpitech={false}
        user={props.user}
        isLoggedIn={true}
      />
      <Service
        name={"Epitech"}
        icon={<Text style={styles.text}>E</Text>}
        isEpitech={true}
        user={props.user}
      />
    </View>
  );
};

export default CredentialsScreen;
