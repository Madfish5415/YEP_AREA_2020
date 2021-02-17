import React, { FC, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { gray, utils, white } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    height: 25,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: gray.light2,
  },
  label: {
    color: gray.light2,
  },
  textInput: {
    marginHorizontal: 15,
    paddingHorizontal: 10,
    flexGrow: 1,
    color: white,
    backgroundColor: gray.light1,
    height: 25,
    borderRadius: 5,
  },
  textInputError: {
    borderWidth: 1,
    borderColor: utils.error,
  },
});

type Props = {
  style?: StyleProp<ViewStyle>;
  label: string;
  formId: string;
  placeholder: string;
  setter: (value: string, text: string) => void;
  error: boolean;
  errorEmail?: boolean;
  required: boolean;
};

export const ItemForm: FC<Props> = (props: Props) => {
  const [text, setText] = useState("");

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.labelContainer}>
        <Text
          style={[
            styles.label,
            {
              color:
                props.error && props.required && text.length == 0
                  ? utils.error
                  : props.errorEmail
                  ? utils.error
                  : gray.light2,
            },
          ]}
        >
          {props.label}
        </Text>
      </View>
      <TextInput
        style={
          props.error && props.required && text.length == 0
            ? [styles.textInput, styles.textInputError]
            : props.errorEmail
            ? [styles.textInput, styles.textInputError]
            : styles.textInput
        }
        placeholder={props.placeholder}
        placeholderTextColor={gray.light3}
        onChangeText={(text) => {
          setText(text);
          props.setter(props.formId, text);
        }}
        secureTextEntry={
          props.formId === "password" || props.formId === "confirmPassword"
        }
      />
    </View>
  );
};
