import React, { FC, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
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
    paddingBottom: 20,
  },
});

const WorkflowsEditScreen: FC = () => {
  const { navigate } = useNavigation();
  const [token, setToken] = useState<string>("");
  const workflowsBloc = new WorkflowBloc(
    new WorkflowRepository(globalThis.serverURL)
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
    getLocalStorage("@userToken")
      .then((data) => {
        if (data) {
          workflowsBloc.add(
            new WorkflowUpdateEvent(
              data,
              workflow.id,
              updatedWorkflow.name ? updatedWorkflow : { name: workflow.name }
            )
          );
        }
      })
      .catch((e) => console.log(e));
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
          workflowsBloc.add(new WorkflowListEvent(token));
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

const { height } = Dimensions.get("window");

const WorkflowsEdit: FC<Props> = (props) => {
  const [screenHeight, setScreenHeight] = useState(0);

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setScreenHeight(contentHeight);
  };

  const scrollEnabled = screenHeight > height - 180;
  return (
    <ScrollView
      style={styles.container}
      onContentSizeChange={onContentSizeChange}
      scrollEnabled={scrollEnabled}
    >
      {props.workflows.map((workflow) => (
        <EditWorkflowItem
          key={workflow.id}
          workflow={workflow}
          delete={props.delete}
          update={props.update}
        />
      ))}
    </ScrollView>
  );
};

export default WorkflowsEditScreen;
