import { Alert } from "react-native";
import { Workflow, WorkflowReaction } from "@area-common/types";

export const ReactionAlert: (
  reaction: WorkflowReaction,
  workflow: Workflow,
  callback: (workflow: Workflow, id: string) => void
) => void = (reaction, workflow, callback) => {
  Alert.alert(
    reaction.reaction.name,
    "Delete this reaction ?",
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
