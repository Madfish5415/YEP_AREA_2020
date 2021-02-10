import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  titleArea: {
    fontSize: 52,
    marginBottom: -35,
    fontWeight: "bold",
  },
  titleNumber: {
    fontSize: 130,
    fontWeight: "bold",
  },
});

export const Title: FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.titleArea, { color: colors.primary }]}>AREA</Text>
      <Text style={[styles.titleNumber, { color: colors.primary }]}>51</Text>
    </View>
  );
};
