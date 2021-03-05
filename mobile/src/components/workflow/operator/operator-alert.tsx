import { Alert } from "react-native";
import { Workflow, WorkflowOperator } from "@area-common/types";

export const OperatorAlert: (
  operator: WorkflowOperator,
  workflow: Workflow,
  callback: (workflow: Workflow) => void
) => void = (operator, workflow, callback) => {
  Alert.alert(
    operator.operator.name,
    "Delete this operator ?",
    [
      {
        text: "Yes",
        onPress: () => {
          const newWorkflow = {
            ...workflow,
            operators: workflow.operators.filter(
              (item) => item.operator.id !== operator.operator.id
            ),
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
