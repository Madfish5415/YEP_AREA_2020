import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Workflow, WorkflowOperator } from "@area-common/types";
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
  bulletLink: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
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
  item: WorkflowOperator;
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
      <View style={[styles.bulletLink, { alignSelf: "center", top: -10 }]} />
      <View
        style={[
          styles.bulletLink,
          { alignSelf: "center", bottom: -10, left: 20 },
        ]}
      />
      <View
        style={[
          styles.bulletLink,
          { alignSelf: "center", bottom: -10, right: 20 },
        ]}
      />
      <Text numberOfLines={1} style={[styles.text, { fontSize: 18 }]}>
        {props.item.operator.name}
      </Text>
    </TouchableOpacity>
  );
};
