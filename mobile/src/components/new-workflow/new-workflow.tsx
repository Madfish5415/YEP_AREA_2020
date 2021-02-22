import React, { FC, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { SectionTitle } from "../common/section-title";
import { ActionSection } from "./action/action-section";
import { OperatorSection } from "../workflow/operator/operator-section";
import { Workflow } from "@area-common/types";
import { gray, primary } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    height: 25,
    paddingHorizontal: 10,
    backgroundColor: gray.light1,
    color: primary.main,
    borderRadius: 5,
  },
});

const NewWorkflowScreen: FC = () => {
  const [name, setName] = useState("workflow");

  const handleSubmitName = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const name = event.nativeEvent.text;
    setName(name);
  };

  return (
    <View style={styles.container}>
      <SectionTitle label={"Name"} style={{ marginTop: 10 }} />
      <TextInput
        style={styles.textInput}
        defaultValue={name}
        onSubmitEditing={handleSubmitName}
      />
      <SectionTitle label={"Actions"} style={{ marginTop: 20 }} />
      <ActionSection />
      <SectionTitle label={"Operators"} style={{ marginTop: 10 }} />
      <OperatorSection />
    </View>
  );
};

export default NewWorkflowScreen;
