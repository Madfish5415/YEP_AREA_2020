import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { gray, primary, white } from "@area-common/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { OAuthCredentialsStackParamList } from "../../screens/oauth-credentials";
import { getLocalStorage } from "../../common/localStorage";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: gray.main,
  },
  connectedText: {
    marginTop: 25,
    color: white,
    fontSize: 18,
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
  textButton: {
    fontSize: 14,
    color: white,
  },
});

type OauthStackRouteProps = RouteProp<
  OAuthCredentialsStackParamList,
  "OAuthCredentials"
>;

type OauthProps = {
  route: OauthStackRouteProps;
};

const OAuthCredentialsScreen: FC<OauthProps> = (props) => {
  const { serviceId } = props.route.params;
  const { navigate } = useNavigation();
  const deleteCredential = async () => {
    const data = await getLocalStorage("@userToken");
    if (data) {
      await fetch(`http://localhost:8080/api/user/credentials/${serviceId}`, {
        headers: {
          authorization: data,
        },
        method: "DELETE",
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.connectedText}>Connected</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => deleteCredential().then(() => navigate("Credentials"))}
      >
        <Text style={styles.textButton}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OAuthCredentialsScreen;
