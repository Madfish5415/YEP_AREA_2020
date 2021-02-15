import React, { FC } from "react";
import { WorkflowItem } from "./workflow-item";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const WorkflowsActiveScreen: FC = () => {
  return (
    <View style={styles.container}>
      <WorkflowItem label={"Workflow 1"} isActive={true} />
      <WorkflowItem label={"Workflow 1"} isActive={false} />
      <WorkflowItem label={"Workflow 1"} isActive={true} />
    </View>
  );
};

export default WorkflowsActiveScreen;
