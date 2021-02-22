import React, { FC, useState } from "react";
import { LogBox, View, StyleSheet, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { WorkflowStackParamsList } from "../../screens/workflow";
import { SectionTitle } from "../common/section-title";
import { Action } from "./action/action";
import { ReactionSection } from "./reaction/reaction-section";
import { OperatorSection } from "./operator/operator-section";
import { ActionSection } from "./action/action-section";
import { Text, useTheme } from "react-native-paper";
import { primary } from "@area-common/styles";
import { SaveAlert } from "./save-alert";
import { ErrorAlert } from "./error-alert";
import { CreateAlert } from "./create-alert";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  saveButton: {
    width: 250,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
  },
});

type WorkflowScreenRouteParams = RouteProp<WorkflowStackParamsList, "Workflow">;

type WorkflowScreenProps = {
  route: WorkflowScreenRouteParams;
};

const WorkflowScreen: FC<WorkflowScreenProps> = (props) => {
  const { fonts } = useTheme();
  const [workflow, setWorkflow] = useState(props.route.params.workflow);

  const submitWorkflow = () => {
    if (
      workflow.action &&
      workflow.reactions.length > 0 &&
      props.route.params.isEditing
    ) {
      props.route.params.callback(props.route.params.workflow, workflow);
      SaveAlert();
    } else if (
      workflow.action &&
      workflow.reactions.length > 0 &&
      !props.route.params.isEditing
    ) {
      props.route.params.callback(workflow);
      CreateAlert();
    } else {
      ErrorAlert();
    }
  };

  return (
    <View style={styles.container}>
      <SectionTitle label={"Action"} style={{ marginTop: 10 }} />
      <ActionSection workflow={workflow} />
      <SectionTitle label={"Operators"} />
      <OperatorSection workflow={workflow} callback={setWorkflow} />
      <SectionTitle label={"Reactions"} />
      <ReactionSection workflow={workflow} callback={setWorkflow} />
      <TouchableOpacity style={styles.saveButton} onPress={submitWorkflow}>
        <Text style={fonts.main}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkflowScreen;
