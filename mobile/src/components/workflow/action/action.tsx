import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Workflow, WorkflowNode } from "@area-common/types";
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
  },
  text: {
    color: gray.main,
  },
});

type Props = {
  item: WorkflowNode;
  workflow: Workflow;
  updateWorkflow: (workflow: Workflow) => void;
};

export const Action: FC<Props> = (props) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate("ActionNode", {
          screen: "ActionNode",
          params: {
            node: props.item,
            workflow: props.workflow,
            updateWorkflow: props.updateWorkflow,
          },
        })
      }
    >
      <Text style={[styles.text, { fontSize: 18 }]} numberOfLines={1}>
        {props.item.name}
      </Text>
    </TouchableOpacity>
  );
};
