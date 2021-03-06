import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { User } from "@area-common/types";
import { primary } from "@area-common/styles";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 30,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
  },
});

type Props = {
  callback: (user: User, partialUser: Partial<User>) => void;
};

export const UpdatePasswordButton: FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.callback}>
      <Text>Update password</Text>
    </TouchableOpacity>
  );
};
