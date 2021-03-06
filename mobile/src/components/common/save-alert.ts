import { Alert } from "react-native";

export const SaveAlert = (to: string) =>
  Alert.alert(
    "Success",
    to === "edit"
      ? "The workflow has been successfully saved"
      : "The workflow has been successfully created",
    [
      {
        text: "Ok",
        onPress: () => null,
      },
    ],
    { cancelable: false }
  );
