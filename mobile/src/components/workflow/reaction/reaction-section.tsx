import { Workflow as WorkflowType, Workflow } from "@area-common/types";
import React, { FC } from "react";
import { Reaction } from "./reaction";
import { NewReaction } from "./new-reaction";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: "25%",
    minHeight: 130,
    maxHeight: 200,
    width: "100%",
  },
});

type Props = {
  workflow: Workflow;
  callback: (workflow: WorkflowType) => void;
};

export const ReactionSection: FC<Props> = (props) => {
  return (
    <ScrollView
      horizontal={true}
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
      }}
      pagingEnabled
    >
      {props.workflow.reactions.map((reaction) => {
        return (
          <Reaction
            key={reaction.reaction.id}
            item={reaction}
            workflow={props.workflow}
            callback={props.callback}
          />
        );
      })}
      <NewReaction />
    </ScrollView>
  );
};
