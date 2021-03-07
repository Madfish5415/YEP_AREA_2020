import React, { FC, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";
import { Variable, WorkflowNode } from "@area-common/types";
import { gray } from "@area-common/styles";
import { Text } from "react-native-paper";
import { CustomTextInput } from "./text-input";

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    width: "100%",
    minHeight: 90,
    alignItems: "center",
    borderBottomColor: gray.light1,
    borderBottomWidth: 1,
  },
  paramsInformationContainer: {
    width: "100%",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionContainer: {
    width: "100%",
    paddingHorizontal: 15,
    alignItems: "flex-start",
    marginVertical: 5,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  typeText: {
    color: gray.light2,
  },
  descriptionText: {
    color: gray.light3,
  },
});

type Props = {
  node: Partial<WorkflowNode>;
  setNode: (action: Partial<WorkflowNode>) => void;
  valueKey: string;
  variable: Variable;
};

export const ParametersItem: FC<Props> = (props) => {
  const [text, setText] = useState(
    props.node?.parameters?.[props.valueKey] || ""
  );

  const submit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    let newParameters: Record<string, string> | undefined =
      props.node.parameters;
    if (!newParameters) newParameters = {};

    newParameters[props.valueKey] = e.nativeEvent.text;
    props.setNode({
      ...props.node,
      parameters: newParameters,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.paramsInformationContainer}>
        <Text style={styles.nameText}>{props.variable.name}:</Text>
        <Text style={styles.typeText}>{props.variable.type}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{props.variable.description}</Text>
      </View>
      <CustomTextInput
        text={text}
        setText={setText}
        placeholder={props.valueKey}
        onSubmitEditing={submit}
      />
    </View>
  );
};
