import { Alert } from "react-native";
import { Workflow, WorkflowNode } from "@area-common/types";

export const OperatorAlert: (
  operator: WorkflowNode,
  workflow: Workflow,
  callback: (workflow: Workflow) => void
) => void = (operator, workflow, callback) => {
  Alert.alert(
    operator.name,
    "Delete this operator ?",
    [
      {
        text: "Yes",
        onPress: () => {
          const newWorkflow = {
            ...workflow,
            nodes: workflow.nodes.filter((item) => item.id !== operator.id),
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
