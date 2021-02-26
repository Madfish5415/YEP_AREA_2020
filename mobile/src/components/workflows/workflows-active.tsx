import React, { FC } from "react";
import { WorkflowItem } from "./workflow-item";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { WorkflowsActiveStackRouteParamsList } from "../../pages/workflows";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import {
  WorkflowBloc,
  WorkflowCreateEvent,
  WorkflowCreateState,
  WorkflowErrorState,
  WorkflowListEvent,
  WorkflowListState,
  WorkflowRepository,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { Workflow } from "@area-common/types";
import { Text, useTheme } from "react-native-paper";
import { primary } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  const createWorkflow = (workflow: Workflow) => {
    workflowsBloc.add(new WorkflowCreateEvent(workflow));
  };

  return (
    <BlocBuilder
      bloc={workflowsBloc}
      condition={(previous, current) => {
        if (current instanceof WorkflowCreateState) {
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
              createWorkflow={createWorkflow}
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
  createWorkflow: (workflow: Workflow) => void;
};

const WorkflowsActive: FC<Props> = (props) => {
  const { fonts } = useTheme();
  const { navigate } = useNavigation();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {props.workflows.map((workflow) => (
        <WorkflowItem key={workflow.id} workflow={workflow} />
      ))}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() =>
          navigate("WorkflowCreate", {
            screen: "WorkflowCreate",
            params: { callback: props.createWorkflow },
          })
        }
      >
        <Text style={fonts.main}>Add workflow</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WorkflowsActiveScreen;
