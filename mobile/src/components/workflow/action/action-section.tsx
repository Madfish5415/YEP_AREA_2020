import React, { FC } from "react";
import { Workflow } from "@area-common/types";
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
};

export const ActionSection: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Action item={props.workflow.action} />
    </View>
  );
};
