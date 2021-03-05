import React, { FC } from "react";
import { TextInput, StyleSheet } from "react-native";
import { gray, white } from "@area-common/styles";

const styles = StyleSheet.create({
  textInput: {
    width: "90%",
    height: 25,
    borderRadius: 5,
    backgroundColor: gray.light1,
    paddingHorizontal: 10,
    color: white,
  },
});

type Props = {
  text: string | undefined;
  setText: (text: string) => void;
  defaultValue?: string;
};

export const CustomTextInput: FC<Props> = (props) => {
  return (
    <TextInput
      style={styles.textInput}
      defaultValue={props.text}
      onChangeText={props.setText}
      placeholderTextColor={gray.light3}
      placeholder={"..."}
    />
  );
};
