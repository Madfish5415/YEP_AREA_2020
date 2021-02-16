import React, { FC } from "react";
import { WorkflowItem } from "./workflow-item";
import { View, StyleSheet } from "react-native";
import { WorkflowsActiveStackRouteParamsList } from "../../pages/workflows";
import { RouteProp } from "@react-navigation/native";
import {
  WorkflowBloc,
  WorkflowErrorState,
  WorkflowListEvent,
  WorkflowListState,
  WorkflowRepository,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

type WorkflowsActiveRouteProps = RouteProp<
  WorkflowsActiveStackRouteParamsList,
  "WorkflowsActive"
>;

type Props = {
  route: WorkflowsActiveRouteProps;
};

const WorkflowsActiveScreen: FC<Props> = (props) => {
  const workflowsBloc = new WorkflowBloc(new WorkflowRepository(""));
  workflowsBloc.add(new WorkflowListEvent());
  return (
    <BlocBuilder
      bloc={workflowsBloc}
      builder={(state) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowListState) {
          return (
            <View style={styles.container}>
              {state.workflows.map((workflow) => (
                <WorkflowItem
                  key={workflow.id}
                  label={workflow.name}
                  isActive={workflow.isActive}
                />
              ))}
            </View>
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

export default WorkflowsActiveScreen;
