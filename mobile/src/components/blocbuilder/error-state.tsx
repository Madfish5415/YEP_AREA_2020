import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

type Props = {
  errorLabel: string;
};

export const ErrorState: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.errorLabel}</Text>
    </View>
  );
};
