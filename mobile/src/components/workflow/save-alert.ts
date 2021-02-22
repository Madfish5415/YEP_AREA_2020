import { Alert } from "react-native";

export const SaveAlert = () =>
  Alert.alert(
    "Saved",
    "The workflow has been successfully saved",
    [
      {
        text: "Ok",
        onPress: () => null,
      },
    ],
    { cancelable: false }
  );
