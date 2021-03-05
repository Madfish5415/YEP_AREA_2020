import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Workflow, WorkflowReaction } from "@area-common/types";
import { Text } from "react-native-paper";
import { gray, primary, secondary } from "@area-common/styles";
import { ReactionAlert } from "./reaction-alert";

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
    alignSelf: "center",
    top: -10,
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
  item: WorkflowReaction;
  workflow: Workflow;
  callback: (workflow: Workflow) => void;
};

export const Reaction: FC<Props> = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() =>
        ReactionAlert(props.item, props.workflow, props.callback)
      }
    >
      <View style={styles.bulletLink} />
      <Text numberOfLines={1} style={[styles.text, { fontSize: 18 }]}>
        {props.item.reaction.name}
      </Text>
    </TouchableOpacity>
  );
};
