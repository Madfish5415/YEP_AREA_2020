import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Workflow, WorkflowNode } from "@area-common/types";
import { Text } from "react-native-paper";
import { gray, primary, secondary } from "@area-common/styles";
import { OperatorAlert } from "./operator-alert";

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
  item: WorkflowNode;
  workflow: Workflow;
  callback: (workflow: Workflow) => void;
};

export const Operator: FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() =>
        OperatorAlert(props.item, props.workflow, props.callback)
      }
    >
      <Text numberOfLines={1} style={[styles.text, { fontSize: 18 }]}>
        {props.item.name}
      </Text>
    </TouchableOpacity>
  );
};
