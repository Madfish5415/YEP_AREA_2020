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
};

export const ActionSection: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      {props.workflow.actions?.length > 0 ? (
        <Action item={props.workflow.actions[0]} />
      ) : (
        <NewWidget widget={"action"} />
      )}
    </View>
  );
};
