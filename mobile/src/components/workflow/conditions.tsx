import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { WorkflowAction } from "@area-common/types";
import { Text } from "react-native-paper";
import { gray, primary } from "@area-common/styles";

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

type Props = {
  item: WorkflowAction;
};

export const Conditions: FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text numberOfLines={1} style={[styles.text, { fontSize: 18 }]}>
        Condition
      </Text>
    </TouchableOpacity>
  );
};
