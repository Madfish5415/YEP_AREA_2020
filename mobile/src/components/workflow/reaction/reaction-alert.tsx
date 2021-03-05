import { Alert } from "react-native";
import { Workflow, WorkflowReaction } from "@area-common/types";

export const ReactionAlert: (
  reaction: WorkflowReaction,
  workflow: Workflow,
  callback: (workflow: Workflow) => void
) => void = (reaction, workflow, callback) => {
  Alert.alert(
    reaction.reaction.name,
    "Delete this reaction ?",
    [
      {
        text: "Yes",
        onPress: () => {
          const newWorkflow = {
            ...workflow,
            reactions: workflow.reactions.filter(
              (item) => item.reaction.id !== reaction.reaction.id
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
