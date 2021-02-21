import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Workflow as WorkflowType, WorkflowAction } from "@area-common/types";
import { Text } from "react-native-paper";
import { gray, primary, secondary } from "@area-common/styles";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
  },
  bulletLink: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    alignSelf: "center",
    bottom: -10,
    borderWidth: 2,
    borderColor: gray.main,
    backgroundColor: secondary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: gray.main,
  },
});

type Props = {
  workflow: WorkflowType;
  updateActionCallback: (
    workflow: WorkflowType,
    action: WorkflowAction
  ) => void;
};

export const Action: FC<Props> = (props) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate("ActionNode", {
          screen: "ActionNode",
          workflow: props.workflow,
          callback: props.updateActionCallback,
          params: {
            workflow: props.workflow,
            updateActionCallback: props.updateActionCallback,
          },
        })
      }
    >
      <Text style={[styles.text, { fontSize: 18 }]}>
        {props.workflow.action.action.name}
      </Text>
      <View style={styles.bulletLink}>
        <Text style={styles.text}>1</Text>
      </View>
    </TouchableOpacity>
  );
};
