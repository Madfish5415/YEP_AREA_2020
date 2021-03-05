import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const DefaultState: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size={"large"} />
    </View>
  );
};
