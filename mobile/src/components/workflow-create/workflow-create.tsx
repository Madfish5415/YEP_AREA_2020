import React, { FC, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { WorkflowCreateStackParamsList } from "../../screens/workflow-create";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { Workflow } from "@area-common/types";
import { v4 as uuidv4 } from "uuid";
import { primary } from "@area-common/styles";
import { ActionSection } from "../workflow/action/action-section";
import { OperatorSection } from "../workflow/operator/operator-section";
import { ReactionSection } from "../workflow/reaction/reaction-section";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  saveButton: {
    marginTop: 10,
    width: 250,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
  },
});

type WorkflowCreateRouteParams = RouteProp<
  WorkflowCreateStackParamsList,
  "WorkflowCreate"
>;

type Props = {
  route: WorkflowCreateRouteParams;
};

const WorkflowCreateScreen: FC<Props> = (props) => {
  const { fonts } = useTheme();
  const { navigate } = useNavigation();
  const [workflow, setWorkflow] = useState<Workflow>({
    userId: uuidv4(),
    id: uuidv4(),
    name: "Workflow",
    description: "",
    active: false,
    actions: [],
    reactions: [],
    executions: [],
  });

  const updateName = (text: string) => {
    setWorkflow({ ...workflow, name: text });
  };

  const submitWorkflow = () => {
    props.route.params.callback(workflow);
    navigate("Home", { screen: "Workflows" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionTitle label={"Workflow's name"} style={{ marginTop: 10 }} />
      <CustomTextInput text={workflow.name} setText={updateName} />
      <SectionTitle label={"Actions"} style={{ marginTop: 20 }} />
      <ActionSection workflow={workflow} />
      <SectionTitle label={"Operators"} />
      <OperatorSection workflow={workflow} callback={setWorkflow} />
      <SectionTitle label={"Reactions"} />
      <ReactionSection workflow={workflow} callback={setWorkflow} />
      <TouchableOpacity style={styles.saveButton} onPress={submitWorkflow}>
        <Text style={fonts.main}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WorkflowCreateScreen;
