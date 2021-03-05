import React, { FC, useState } from "react";
import { WorkflowItem } from "./workflow-item";
import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  WorkflowBloc,
  WorkflowErrorState,
  WorkflowInitialState,
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
import { getLocalStorage } from "../../common/localStorage";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const WorkflowsActiveScreen: FC = () => {
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

  const updateWorkflow = (
    workflow: Workflow,
    updatedWorkflow: Partial<Workflow>
  ) => {
    workflowsBloc.add(
      new WorkflowUpdateEvent(token, workflow.id, updatedWorkflow)
    );
  };

  return (
    <BlocBuilder
      bloc={workflowsBloc}
      condition={(previous: WorkflowState, current: WorkflowState) => {
        if (current instanceof WorkflowUpdateState) {
          workflowsBloc.add(new WorkflowListEvent(token));
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
        if (state instanceof WorkflowInitialState) {
          return <Text>Hello</Text>;
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
