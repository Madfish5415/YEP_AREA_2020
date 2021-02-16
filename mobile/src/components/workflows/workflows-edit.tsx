import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { EditWorkflowItem } from "./edit-workflow-item";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const WorkflowsEditScreen: FC = () => {
  return (
    <View style={styles.container}>
      <EditWorkflowItem />
      <EditWorkflowItem />
      <EditWorkflowItem />
    </View>
  );
};

export default WorkflowsEditScreen;
