import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { gray, primary } from "@area-common/styles";
import { useNavigation } from "@react-navigation/native";
import { Workflow } from "@area-common/types";

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  text: {
    color: gray.main,
  },
});

type Props = {
  widget: string;
  workflow: Workflow;
  updateWorkflow: (workflow: Workflow) => void;
};

export const NewWidget: FC<Props> = (props) => {
  const { navigate } = useNavigation();

  const navigateToEditNodePage = () => {
    if (props.widget === "action") {
      navigate("ActionNode", {
        screen: "ActionNode",
        params: {
          workflow: props.workflow,
          updateWorkflow: props.updateWorkflow,
        },
      });
    }
    if (props.widget === "operator") {
      navigate("OperatorNode", {
        screen: "OperatorNode",
        params: {
          workflow: props.workflow,
          updateWorkflow: props.updateWorkflow,
        },
      });
    }
    if (props.widget === "reaction") {
      navigate("ReactionNode", {
        screen: "ReactionNode",
        params: {
          workflow: props.workflow,
          updateWorkflow: props.updateWorkflow,
        },
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToEditNodePage}>
      <Text style={[styles.text, { fontSize: 50 }]}>+</Text>
      <Text numberOfLines={1} style={[styles.text, { fontSize: 10 }]}>
        Add {props.widget}
      </Text>
    </TouchableOpacity>
  );
};
