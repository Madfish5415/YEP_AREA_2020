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
import { Operator } from "./operator";
import { Reaction } from "./reaction";
import { NewOperator } from "./new-operator";
import { NewReaction } from "./new-reaction";
import { NewAction } from "./new-action";

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
        {props.workflow.action ? (
          <Action item={props.workflow.action} />
        ) : (
          <NewAction />
        )}
      </View>
      <SectionTitle label={"Conditions"} />
      <ScrollView
        horizontal={true}
        style={styles.conditionsContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        }}
        pagingEnabled
      >
        {props.workflow.operators?.map((operator) => (
          <Operator key={operator.id} item={operator} />
        ))}
        <NewOperator />
        <Operator />
      </ScrollView>
      <SectionTitle label={"Reactions"} />
      <ScrollView
        horizontal={true}
        style={styles.conditionsContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        }}
        pagingEnabled
      >
        {props.workflow.reactions?.map((reaction) => (
          <Reaction key={reaction.reaction.id} item={reaction} />
        ))}
        <NewReaction />
      </ScrollView>
    </View>
  );
};

export default WorkflowScreen;
