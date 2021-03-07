import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { gray } from "@area-common/styles";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { white, primary } from "@area-common/styles";
import { useNavigation, RouteProp } from "@react-navigation/core";
import { getLocalStorage } from "../../common/localStorage";
import { jsonSchema } from "uuidv4";
import { EpitechStackParamList } from "../../screens/epitech-credentials";

const styles = StyleSheet.create({
  root: {
    display: "flex",
  },
  container: {
    alignItems: "center",
    backgroundColor: gray.main,
  },
  sectionTitle: {
    marginTop: 10,
  },
  button: {
    marginTop: 25,
    backgroundColor: primary.main,
    width: 160,
    height: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: white,
    fontSize: 14,
  },
  connectedText: {
    marginTop: 25,
    color: white,
    fontSize: 18,
  },
});

type EpitechStackRouteProps = RouteProp<
  EpitechStackParamList,
  "EpitechCredentials"
>;

type EpitechProps = {
  route: EpitechStackRouteProps;
};

const EpitechCredentialsScreen: FC<EpitechProps> = (props) => {
  const { isConnected, setConnected } = props.route.params;
  const [autoLoginLink, setAutoLoginLink] = React.useState("");
  const saveAutoLoginLink = async (): Promise<void> => {
    const data = await getLocalStorage("@userToken");
    if (data) {
      const response = await fetch(
        `${serverURL}/api/authentication/services/epitech/provide`,
        {
          headers: {
            authorization: data,
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            autologin: autoLoginLink,
          }),
        }
      );
      setConnected(true);
    }
  };
  const { navigate } = useNavigation();
  const deleteCredential = async () => {
    const data = await getLocalStorage("@userToken");
    if (data) {
      await fetch(`${serverURL}/api/user/credentials/epitech`, {
        headers: {
          authorization: data,
        },
        method: "DELETE",
      });
    }
    setConnected(false);
  };

  return (
    <View style={styles.root}>
      {isConnected ? (
        <View style={styles.container}>
          <Text style={styles.connectedText}>Connected</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              deleteCredential().then(() => navigate("Credentials"))
            }
          >
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>{isConnected}</Text>
          <SectionTitle label={"Autologin Link"} style={styles.sectionTitle} />
          <CustomTextInput text={autoLoginLink} setText={setAutoLoginLink} />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              saveAutoLoginLink().then(() => navigate("Credentials"))
            }
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default EpitechCredentialsScreen;
