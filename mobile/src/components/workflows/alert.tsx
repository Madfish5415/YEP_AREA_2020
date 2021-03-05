import { Alert } from "react-native";
import { Workflow } from "@area-common/types";

export const DeleteAlert: (
  workflow: Workflow,
  callback: (workflow: Workflow) => void
) => void = (workflow, callback) => {
  Alert.alert(
    workflow.name,
    "Voulez vous supprimer ce workflow ?",
    [
      {
        text: "Oui",
        onPress: () => callback(workflow),
      },
      {
        text: "Annuler",
        onPress: () => null,
        style: "cancel",
      },
    ],
    { cancelable: false }
  );
};
