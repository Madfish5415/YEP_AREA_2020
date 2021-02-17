import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { gray, primary } from "@area-common/styles";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  text: {
    color: gray.main,
  },
});

export const NewReaction: FC = () => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigate("Home")}>
      <Text style={[styles.text, { fontSize: 50 }]}>+</Text>
      <Text numberOfLines={1} style={[styles.text, { fontSize: 10 }]}>
        Add reaction
      </Text>
    </TouchableOpacity>
  );
};
