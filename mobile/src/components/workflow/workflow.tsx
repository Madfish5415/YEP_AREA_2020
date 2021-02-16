import React, { FC } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { BlocBuilder } from "@felangel/react-bloc";
import { RouteProp } from "@react-navigation/native";
import { WorkflowStackParamsList } from "../../screens/workflow";
import {
  WorkflowBloc,
  WorkflowErrorState,
  WorkflowReadEvent,
  WorkflowReadState,
  WorkflowRepository,
  WorkflowState,
} from "@area-common/blocs";
import { ErrorState } from "../blocbuilder/error-state";
import { DefaultState } from "../blocbuilder/default-state";
import { Workflow as WorkflowType } from "@area-common/types";
import { View } from "react-native";
import { SectionTitle } from "../common/section-title";
import { Action } from "./action";
import { Conditions } from "./conditions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionContainer: {
    height: "25%",
    minHeight: 130,
    maxHeight: 200,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  conditionsContainer: {
    height: "25%",
    minHeight: 130,
    maxHeight: 200,
    width: "100%",
  },
});

type WorkflowScreenRouteParams = RouteProp<WorkflowStackParamsList, "Workflow">;

type WorkflowScreenProps = {
  route: WorkflowScreenRouteParams;
};

const WorkflowScreen: FC<WorkflowScreenProps> = (props) => {
  const workflowBloc = new WorkflowBloc(new WorkflowRepository(""));
  workflowBloc.add(new WorkflowReadEvent(props.route.params.workflow.id));

  return (
    <BlocBuilder
      bloc={workflowBloc}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowReadState) {
          return <Workflow workflow={state.workflow} />;
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  workflow: WorkflowType;
};

const Workflow: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <SectionTitle label={"Action"} style={{ marginTop: 10 }} />
      <View style={styles.actionContainer}>
        <Action />
      </View>
      <SectionTitle label={"Conditions"} />
      <ScrollView
        horizontal={true}
        style={styles.conditionsContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
        pagingEnabled
      >
        <Conditions />
        <Conditions />
        <Conditions />
        <Conditions />
        <Conditions />
        <Conditions />
      </ScrollView>
      <SectionTitle label={"Reactions"} />
    </View>
  );
};

export default WorkflowScreen;
