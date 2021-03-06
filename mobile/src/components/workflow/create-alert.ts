import { Alert } from "react-native";

export const CreateAlert = () =>
  Alert.alert(
    "Created",
    "The workflow has been successfully created",
    [
      {
        text: "Ok",
        onPress: () => null,
        style: "cancel",
      },
    ],
    { cancelable: false }
  );
