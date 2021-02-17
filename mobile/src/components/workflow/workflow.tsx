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
  WorkflowUpdateEvent,
  WorkflowUpdateState,
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
import { v4 as uuidv4 } from "uuid";

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

  const deleteOperator = (workflow: WorkflowType, id: string) => {
    const index = workflow.operators.findIndex((operator) => operator.id == id);

    workflow.operators.splice(index, 1);
    workflowBloc.add(new WorkflowUpdateEvent(workflow.id, workflow));
  };

  const deleteReaction = (workflow: WorkflowType, id: string) => {
    const index = workflow.reactions.findIndex((reaction) => reaction.id == id);

    workflow.reactions.splice(index, 1);
    workflowBloc.add(new WorkflowUpdateEvent(workflow.id, workflow));
  };

  return (
    <BlocBuilder
      bloc={workflowBloc}
      key={uuidv4()}
      condition={(previous: WorkflowState, current: WorkflowState) => {
        if (current instanceof WorkflowUpdateState) {
          workflowBloc.add(
            new WorkflowReadEvent(props.route.params.workflow.id)
          );
        }
        return true;
      }}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowReadState) {
          return (
            <Workflow
              workflow={state.workflow}
              operatorCallback={deleteOperator}
              reactionCallback={deleteReaction}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  workflow: WorkflowType;
  operatorCallback: (workflow: WorkflowType, id: string) => void;
  reactionCallback: (workflow: WorkflowType, id: string) => void;
};

const Workflow: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <SectionTitle label={"Action"} style={{ marginTop: 10 }} />
      <View style={styles.actionContainer}>
        <Action item={props.workflow.action} />
      </View>
      <SectionTitle label={"Operators"} />
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
        {props.workflow.operators.map((operator) => (
          <Operator
            key={operator.id}
            item={operator}
            workflow={props.workflow}
            callback={props.operatorCallback}
          />
        ))}
        <NewOperator />
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
        {props.workflow.reactions.map((reaction) => {
          return (
            <Reaction
              key={reaction.reaction.id}
              item={reaction}
              workflow={props.workflow}
              callback={props.reactionCallback}
            />
          );
        })}
        <NewReaction />
      </ScrollView>
    </View>
  );
};

export default WorkflowScreen;
