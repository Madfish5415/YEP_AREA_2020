import React, { FC } from "react";
import { Workflow } from "@area-common/types";
import { Action } from "./action";
import { View, StyleSheet } from "react-native";
import { NewWidget } from "../../common/new-widget";

const styles = StyleSheet.create({
  container: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});

type Props = {
  workflow: Workflow;
  callback: (workflow: Workflow) => void;
};

export const ActionSection: FC<Props> = (props) => {
  const actionsNodes = props.workflow.nodes.filter(
    (node) => node.label === "action"
  );

  return (
    <View style={styles.container}>
      {actionsNodes.length > 0 ? (
        <Action
          item={actionsNodes[0]}
          updateWorkflow={props.callback}
          workflow={props.workflow}
        />
      ) : (
        <NewWidget
          widget={"action"}
          updateWorkflow={props.callback}
          workflow={props.workflow}
        />
      )}
    </View>
  );
};
