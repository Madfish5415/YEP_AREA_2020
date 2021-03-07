import React, { FC, useState } from "react";
import { LogBox, StyleSheet, SafeAreaView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { WorkflowStackParamsList } from "../../screens/workflow";
import { SectionTitle } from "../common/section-title";
import { Action } from "./action/action";
import { ReactionSection } from "./reaction/reaction-section";
import { OperatorSection } from "./operator/operator-section";
import { ActionSection } from "./action/action-section";
import { SaveAlert } from "../common/save-alert";
import { ErrorAlert } from "../common/error-alert";
import { SaveButton } from "../common/save-button";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

type WorkflowScreenRouteParams = RouteProp<WorkflowStackParamsList, "Workflow">;

type WorkflowScreenProps = {
  route: WorkflowScreenRouteParams;
};

const WorkflowScreen: FC<WorkflowScreenProps> = (props) => {
  const [workflow, setWorkflow] = useState(props.route.params.workflow);

  const submitWorkflow = () => {
    const validWorkflow = workflow.nodes.filter(
      (node) => node.label === "action" || node.label === "reaction"
    );
    if (validWorkflow.length > 0) {
      props.route.params.callback(props.route.params.workflow, workflow);
      SaveAlert("edit");
    } else {
      ErrorAlert();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle label={"Action"} style={{ marginTop: 10 }} />
      <ActionSection workflow={workflow} callback={setWorkflow} />
      <SectionTitle label={"Operators"} />
      <OperatorSection workflow={workflow} callback={setWorkflow} />
      <SectionTitle label={"Reactions"} />
      <ReactionSection workflow={workflow} callback={setWorkflow} />
      <SaveButton onPress={submitWorkflow} />
    </SafeAreaView>
  );
};

export default WorkflowScreen;
