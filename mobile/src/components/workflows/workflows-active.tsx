import React, { FC } from "react";
import { WorkflowItem } from "./workflow-item";
import { View, StyleSheet } from "react-native";
import { WorkflowsActiveStackRouteParamsList } from "../../pages/workflows";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import {
  WorkflowBloc,
  WorkflowErrorState,
  WorkflowListEvent,
  WorkflowListState,
  WorkflowRepository,
  WorkflowState,
  WorkflowUpdateEvent,
  WorkflowUpdateState,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { Workflow } from "@area-common/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type WorkflowsActiveRouteProps = RouteProp<
  WorkflowsActiveStackRouteParamsList,
  "WorkflowsActive"
>;

type WorkflowsActiveScreenProps = {
  route: WorkflowsActiveRouteProps;
};

const WorkflowsActiveScreen: FC<WorkflowsActiveScreenProps> = (props) => {
  const workflowsBloc = new WorkflowBloc(new WorkflowRepository(""));
  workflowsBloc.add(new WorkflowListEvent());
  useIsFocused();

  const updateWorkflow = (
    workflow: Workflow,
    updatedWorkflow: Partial<Workflow>
  ) => {
    workflowsBloc.add(new WorkflowUpdateEvent(workflow.id, updatedWorkflow));
  };

  return (
    <BlocBuilder
      bloc={workflowsBloc}
      condition={(previous: WorkflowState, current: WorkflowState) => {
        if (current instanceof WorkflowUpdateState) {
          workflowsBloc.add(new WorkflowListEvent());
        }
        return true;
      }}
      builder={(state) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowListState) {
          return (
            <WorkflowsActive
              workflows={state.workflows}
              update={updateWorkflow}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  workflows: Workflow[];
  update: (workflow: Workflow, updatedWorkflow: Partial<Workflow>) => void;
};

const WorkflowsActive: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      {props.workflows.map((workflow) => (
        <WorkflowItem
          key={workflow.id}
          workflow={workflow}
          update={props.update}
        />
      ))}
    </View>
  );
};

export default WorkflowsActiveScreen;
