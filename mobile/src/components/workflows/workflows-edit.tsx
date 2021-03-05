import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { EditWorkflowItem } from "./edit-workflow-item";
import {
  WorkflowBloc,
  WorkflowDeleteEvent,
  WorkflowDeleteState,
  WorkflowErrorState,
  WorkflowListEvent,
  WorkflowListState,
  WorkflowRepository,
  WorkflowState,
  WorkflowUpdateEvent,
  WorkflowUpdateState,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { ErrorState } from "../blocbuilder/error-state";
import { DefaultState } from "../blocbuilder/default-state";
import { Workflow } from "@area-common/types";
import { v4 as uuidv4 } from "uuid";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getLocalStorage } from "../../common/localStorage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const WorkflowsEditScreen: FC = () => {
  const { navigate } = useNavigation();
  const [token, setToken] = useState<string>("");
  const workflowsBloc = new WorkflowBloc(
    new WorkflowRepository("http://localhost:8080")
  );
  useIsFocused();
  getLocalStorage("@userToken")
    .then((data) => {
      if (data) {
        setToken(data);
        workflowsBloc.add(new WorkflowListEvent(data));
      } else {
        navigate("SignIn");
      }
    })
    .catch((e) => console.log(e));

  const updateWorkflowName = (
    workflow: Workflow,
    updatedWorkflow: Partial<Workflow>
  ) => {
    workflowsBloc.add(
      new WorkflowUpdateEvent(
        workflow.id,
        updatedWorkflow.name
          ? updatedWorkflow
          : { name: workflow.action.action.name }
      )
    );
  };

  const deleteWorkflow = (workflow: Workflow) => {
    workflowsBloc.add(new WorkflowDeleteEvent(token, workflow.id));
  };

  return (
    <BlocBuilder
      bloc={workflowsBloc}
      key={uuidv4()}
      condition={(previous: WorkflowState, current: WorkflowState) => {
        if (current instanceof WorkflowDeleteState) {
          workflowsBloc.add(new WorkflowListEvent(token));
        }
        if (current instanceof WorkflowUpdateState) {
          workflowsBloc.add(new WorkflowListEvent());
        }
        return true;
      }}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowListState) {
          return (
            <WorkflowsEdit
              workflows={state.workflows}
              delete={deleteWorkflow}
              update={updateWorkflowName}
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
  delete: (workflow: Workflow) => void;
  update: (workflow: Workflow, updatedWorkflow: Partial<Workflow>) => void;
};

const WorkflowsEdit: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      {props.workflows.map((workflow) => (
        <EditWorkflowItem
          key={workflow.id}
          workflow={workflow}
          delete={props.delete}
          update={props.update}
        />
      ))}
    </View>
  );
};

export default WorkflowsEditScreen;
