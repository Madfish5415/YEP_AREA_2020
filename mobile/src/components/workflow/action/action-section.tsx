import React, { FC } from "react";
import {
  Workflow as WorkflowType,
  Workflow,
  WorkflowAction,
} from "@area-common/types";
import { Action } from "./action";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: "25%",
    minHeight: 130,
    maxHeight: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

type Props = {
  workflow: Workflow;
  updateActionCallback: (
    workflow: WorkflowType,
    action: WorkflowAction
  ) => void;
};

export const ActionSection: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Action
        workflow={props.workflow}
        updateActionCallback={props.updateActionCallback}
      />
    </View>
  );
};
