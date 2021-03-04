import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { gray } from "@area-common/styles";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: gray.main,
  },
  sectionTitle: {
    marginTop: 10,
  },
});

const EpitechCredentialsScreen: FC = () => {
  const [autoLoginLink, setAutoLoginLink] = React.useState("");
  return (
    <View style={styles.container}>
      <SectionTitle label={"Autologin Link"} style={styles.sectionTitle} />
      <CustomTextInput text={autoLoginLink} setText={setAutoLoginLink} />
    </View>
  );
};

export default EpitechCredentialsScreen;
