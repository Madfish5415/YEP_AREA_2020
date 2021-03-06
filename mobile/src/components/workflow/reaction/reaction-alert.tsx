import { Alert } from "react-native";
import { Workflow, WorkflowNode } from "@area-common/types";

export const ReactionAlert: (
  reaction: WorkflowNode,
  workflow: Workflow,
  callback: (workflow: Workflow) => void
) => void = (reaction, workflow, callback) => {
  Alert.alert(
    reaction.name,
    "Delete this reaction ?",
    [
      {
        text: "Yes",
        onPress: () => {
          const newWorkflow = {
            ...workflow,
            nodes: workflow.nodes.filter((item) => item.id !== reaction.id),
          };
          callback(newWorkflow);
        },
      },
      {
        text: "Cancel",
        onPress: () => null,
        style: "destructive",
      },
    ],
    { cancelable: false }
  );
};
