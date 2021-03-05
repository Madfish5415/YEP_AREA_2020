import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { WorkflowAction } from "@area-common/types";
import { Text } from "react-native-paper";
import { gray, primary, secondary } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
  },
  bulletLink: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    alignSelf: "center",
    bottom: -10,
    borderWidth: 2,
    borderColor: gray.main,
    backgroundColor: secondary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: gray.main,
  },
});

type Props = {
  item: WorkflowAction;
};

export const Action: FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={[styles.text, { fontSize: 18 }]}>{props.item.name}</Text>
      <View style={styles.bulletLink}>
        <Text style={styles.text}>1</Text>
      </View>
    </TouchableOpacity>
  );
};
