import React, { FC } from "react";
import { StyleSheet } from "react-native";
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
import { Action } from "./action/action";
import { ReactionSection } from "./reaction/reaction-section";
import { OperatorSection } from "./operator/operator-section";
import { ActionSection } from "./action/action-section";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
      <ActionSection workflow={props.workflow} />
      <SectionTitle label={"Operators"} />
      <OperatorSection
        workflow={props.workflow}
        callback={props.operatorCallback}
      />
      <SectionTitle label={"Reactions"} />
      <ReactionSection
        workflow={props.workflow}
        callback={props.reactionCallback}
      />
    </View>
  );
};

export default WorkflowScreen;
