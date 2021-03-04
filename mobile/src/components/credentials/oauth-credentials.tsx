import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { gray, primary, white } from "@area-common/styles";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const OauthCredentialsScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.connectedText}>Connected as </Text>
      <TouchableOpacity style={styles.button} onPress={() => alert("Todo!")}>
        <Text style={styles.textButton}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OauthCredentialsScreen;
