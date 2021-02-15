import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import Service from "./service";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#262C40",
    marginTop: 10,
  },
});

const CredentialsScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Service name={"Instagram"} imageName={"instagram"} />
      <Service name={"Youtube"} imageName={"youtube-play"} />
      <Service name={"Epitech"} imageName={"etsy"} />
    </View>
  );
};

export default CredentialsScreen;
