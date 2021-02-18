import { Alert } from "react-native";
import { Workflow, WorkflowOperator } from "@area-common/types";

export const OperatorAlert: (
  operator: WorkflowOperator,
  workflow: Workflow,
  callback: (workflow: Workflow, id: string) => void
) => void = (operator, workflow, callback) => {
  Alert.alert(
    operator.operator.name,
    "Delete this operator ?",
    [
      {
        text: "Yes",
        onPress: () => callback(workflow, operator.operator.id),
      },
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
    ],
    { cancelable: false }
  );
};
