import { Alert } from "react-native";

export const ErrorAlert = () =>
  Alert.alert(
    "Error",
    "The workflow need at least one action and reaction",
    [
      {
        text: "Ok",
        onPress: () => null,
        style: "cancel",
      },
    ],
    { cancelable: false }
  );
