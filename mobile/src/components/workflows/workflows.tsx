import React, { FC } from "react";
import { Text, useTheme } from "react-native-paper";

const WorkflowsScreen: FC = () => {
  const { fonts } = useTheme();
  return <Text style={fonts.nodeLabel}>Workflows</Text>;
};

export default WorkflowsScreen;
