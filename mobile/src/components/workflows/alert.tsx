import { Alert } from "react-native";
import { Workflow } from "@area-common/types";

export const DeleteAlert: (
  workflow: Workflow,
  callback: (workflow: Workflow) => void
) => void = (workflow, callback) => {
  Alert.alert(
    workflow.name,
    "Delete this workflow ?",
    [
      {
        text: "Yes",
        onPress: () => callback(workflow),
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
