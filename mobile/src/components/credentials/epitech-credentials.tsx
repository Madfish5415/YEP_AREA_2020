import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { gray } from "@area-common/styles";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { white, primary } from "@area-common/styles";
import { useNavigation } from "@react-navigation/core";
import { getLocalStorage } from "../../common/localStorage";
import { jsonSchema } from "uuidv4";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

const EpitechCredentialsScreen: FC = () => {
  const [autoLoginLink, setAutoLoginLink] = React.useState("");
  const saveAutoLoginLink = async (): Promise<void> => {
    const data = await getLocalStorage("@userToken");
    if (data) {
      const response = await fetch(
        `http://localhost:8080/api/authentication/services/epitech/provide`,
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
    }
  };
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <SectionTitle label={"Autologin Link"} style={styles.sectionTitle} />
      <CustomTextInput text={autoLoginLink} setText={setAutoLoginLink} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => saveAutoLoginLink().then(() => navigate("Credentials"))}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EpitechCredentialsScreen;
