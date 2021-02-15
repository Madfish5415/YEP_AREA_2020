import React, { FC } from "react";
import { Text, useTheme } from "react-native-paper";
import { WorkflowItem } from "./workflow-item";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const WorkflowsScreen: FC = () => {
  return (
    <View style={styles.container}>
      <WorkflowItem label={"Workflow 1"} isActive={true} />
      <WorkflowItem label={"Workflow 1"} isActive={false} />
      <WorkflowItem label={"Workflow 1"} isActive={true} />
    </View>
  );
};

export default WorkflowsScreen;
