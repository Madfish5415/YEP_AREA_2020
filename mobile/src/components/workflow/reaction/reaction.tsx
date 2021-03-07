import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Workflow, WorkflowNode } from "@area-common/types";
import { Text } from "react-native-paper";
import { gray, primary } from "@area-common/styles";
import { ReactionAlert } from "./reaction-alert";
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

type Props = {
  item: WorkflowNode;
  workflow: Workflow;
  callback: (workflow: Workflow) => void;
};

export const Reaction: FC<Props> = (props) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() =>
        ReactionAlert(props.item, props.workflow, props.callback)
      }
      onPress={() =>
        navigate("ReactionNode", {
          screen: "ReactionNode",
          params: {
            node: props.item,
            workflow: props.workflow,
            updateWorkflow: props.callback,
          },
        })
      }
    >
      <Text numberOfLines={1} style={[styles.text, { fontSize: 18 }]}>
        {props.item.name}
      </Text>
    </TouchableOpacity>
  );
};
