import { Alert } from "react-native";

export const NodeServiceAlert = () =>
  Alert.alert(
    "Error",
    "The action must have at least one service selected",
    [
      {
        text: "Ok",
        onPress: () => null,
        style: "cancel",
      },
    ],
    { cancelable: false }
  );
