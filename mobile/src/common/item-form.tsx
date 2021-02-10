import React, { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { gray, white } from "@area-common/styles";

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
});

type Props = {
  label: string;
  formId: string;
  placeholder: string;
  setter: (value: string, text: string) => void;
};

export const ItemForm: FC = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <TextInput
        style={[styles.textInput]}
        placeholder={props.placeholder}
        placeholderTextColor={gray.light3}
        onChangeText={(text) => props.setter(props.formId, text)}
      />
    </View>
  );
};
