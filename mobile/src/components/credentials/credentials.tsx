import React, { FC, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Service from "./service";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { primary, gray } from "@area-common/styles";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { CredentialsStackParamsList } from "../../pages/credentials";
import { AuthConfiguration } from "react-native-app-auth";
import { getLocalStorage } from "../../common/localStorage";

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
  return <Credentials />;
};

export type ConfigProps = {
  issuer: string;
  clientID: string;
  redirectURL: string;
  scopes: string[];
};

export const oAuthConfigMap = new Map<string, AuthConfiguration>([
  [
    "youtube",
    {
      issuer: "https://accounts.google.com",
      clientId:
        "627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal.apps.googleusercontent.com",
      redirectUrl:
        "com.googleusercontent.apps.627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal:/credentials",
      scopes: [
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.force-ssl",
      ],
    },
  ],
  [
    "github",
    {
      redirectUrl:
        "com.googleusercontent.apps.627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal://credentials",
      clientId: "8581958e9dae37e30f77",
      clientSecret: "9ed0766602121c709c8c3275034316fba97b42b1",
      scopes: ["identity", "repo", "notifications"],
      serviceConfiguration: {
        authorizationEndpoint: "https://github.com/login/oauth/authorize",
        tokenEndpoint: "https://github.com/login/oauth/access_token",
        revocationEndpoint:
          "https://github.com/settings/connections/applications/8581958e9dae37e30f77",
      },
    },
  ],
  [
    "office365",
    {
      issuer:
        "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/v2.0",
      clientId: "dff89b78-9082-4107-ba9f-8b32f432f4fc",
      redirectUrl:
        "com.googleusercontent.apps.627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal://credentials/",
      scopes: ["openid", "user.read"],
    },
  ],
  [
    "yammer",
    {
      issuer:
        "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/v2.0",
      clientId: "dff89b78-9082-4107-ba9f-8b32f432f4fc",
      redirectUrl:
        "com.googleusercontent.apps.627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal://credentials/",
      scopes: ["https://api.yammer.com/user_impersonation"],
    },
  ],
  [
    "outlook",
    {
      issuer:
        "https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/v2.0",
      clientId: "dff89b78-9082-4107-ba9f-8b32f432f4fc",
      redirectUrl:
        "com.googleusercontent.apps.627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal://credentials/",
      scopes: ["openid", "user.read"],
    },
  ],
  [
    "gmail",
    {
      issuer: "https://accounts.google.com",
      clientId:
        "627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal.apps.googleusercontent.com",
      redirectUrl:
        "com.googleusercontent.apps.627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal:/credentials",
      scopes: [
        "https://www.googleapis.com/auth/gmail.readonly",
        "https://www.googleapis.com/auth/gmail.send",
      ],
    },
  ],
]);

const Credentials: FC = () => {
  const [officeLoggedIn, setOfficeLoggedIn] = useState(false);
  const [githubLoggedIn, setGithubLoggedIn] = useState(false);
  const [youtubeLoggedIn, setYoutubeLoggedIn] = useState(false);
  const [epitechLoggedIn, setEpitechLoggedIn] = useState(false);
  const [yammerLoggedIn, setYammerLoggedIn] = useState(false);
  const [outlookLoggedIn, setOutlookLoggedIn] = useState(false);
  const [gmailLoggedIn, setGmailLoggedIn] = useState(false);

  const { navigate } = useNavigation();
  const focused = useIsFocused();
  useEffect(() => {
    async function getLoggedIn() {
      setOfficeLoggedIn(false);
      setGithubLoggedIn(false);
      setYoutubeLoggedIn(false);
      const data = await getLocalStorage("@userToken");
      if (data) {
        const response = await fetch(
          "http://localhost:8080/api/user/credentials",
          {
            headers: {
              authorization: data,
            },
          }
        );
        const json = await response.json();
        if (json && json.data) {
          console.log(json.data);
          json.data.forEach((service: string) => {
            if (service.startsWith("microsoft")) {
              setOfficeLoggedIn(true);
            } else if (service.startsWith("github")) {
              setGithubLoggedIn(true);
            } else if (service.startsWith("google")) {
              setYoutubeLoggedIn(true);
            } else if (service.startsWith("epitech")) {
              setEpitechLoggedIn(true);
            } else if (service.startsWith("yammer")) {
              setYammerLoggedIn(true);
            } else if (service.startsWith("outlook")) {
              setOutlookLoggedIn(true);
            } else if (service.startsWith("gmail")) {
              setGmailLoggedIn(true);
            }
          });
        }
      } else {
        navigate("Home");
      }
    }
    getLoggedIn();
  }, [focused]);
  return (
    <View style={styles.container}>
      <Service
        name={"Office 365"}
        serviceId={"microsoft"}
        icon={
          <MaterialCommunityIcons
            size={50}
            name={"microsoft-office"}
            color={primary.main}
          />
        }
        isEpitech={false}
        isLoggedIn={officeLoggedIn}
        oAuthConfig={oAuthConfigMap.get("office365")}
        serviceName={"microsoft"}
        setConnected={setOfficeLoggedIn}
      />
      <Service
        name={"Github"}
        serviceId={"github"}
        icon={<FontAwesome size={50} name={"github"} color={primary.main} />}
        isEpitech={false}
        isLoggedIn={githubLoggedIn}
        oAuthConfig={oAuthConfigMap.get("github")}
        serviceName={"github"}
        setConnected={setGithubLoggedIn}
      />
      <Service
        name={"Youtube"}
        serviceId={"youtube"}
        icon={
          <FontAwesome size={50} name={"youtube-play"} color={primary.main} />
        }
        isEpitech={false}
        isLoggedIn={youtubeLoggedIn}
        oAuthConfig={oAuthConfigMap.get("youtube")}
        serviceName={"youtube"}
        setConnected={setYoutubeLoggedIn}
      />
      <Service
        serviceId={"epitech"}
        name={"Epitech"}
        icon={<Text style={styles.text}>E</Text>}
        isLoggedIn={epitechLoggedIn}
        isEpitech={true}
        setConnected={setEpitechLoggedIn}
      />
      <Service
        name={"Yammer"}
        serviceId={"yammer"}
        icon={
          <MaterialCommunityIcons
            size={50}
            name={"microsoft-yammer"}
            color={primary.main}
          />
        }
        isEpitech={false}
        isLoggedIn={yammerLoggedIn}
        oAuthConfig={oAuthConfigMap.get("yammer")}
        serviceName={"yammer"}
        setConnected={setYammerLoggedIn}
      />
      <Service
        name={"Outlook"}
        serviceId={"outlook"}
        icon={
          <MaterialCommunityIcons
            size={50}
            name={"microsoft-outlook"}
            color={primary.main}
          />
        }
        isEpitech={false}
        isLoggedIn={outlookLoggedIn}
        oAuthConfig={oAuthConfigMap.get("outlook")}
        serviceName={"outlook"}
        setConnected={setOutlookLoggedIn}
      />
      <Service
        name={"Gmail"}
        serviceId={"gmail"}
        icon={
          <MaterialCommunityIcons
            size={50}
            name={"gmail"}
            color={primary.main}
          />
        }
        isEpitech={false}
        isLoggedIn={gmailLoggedIn}
        oAuthConfig={oAuthConfigMap.get("gmail")}
        serviceName={"gmail"}
        setConnected={setGmailLoggedIn}
      />
    </View>
  );
};

export default CredentialsScreen;
