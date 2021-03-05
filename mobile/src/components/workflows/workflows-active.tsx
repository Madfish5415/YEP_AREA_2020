import React, { FC, useState } from "react";
import { WorkflowItem } from "./workflow-item";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  WorkflowBloc,
  WorkflowCreateEvent,
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
import { getLocalStorage } from "../../common/localStorage";
import { Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { primary } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  createWorkflowButton: {
    marginTop: 20,
    width: 250,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
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

  return (
    <BlocBuilder
      bloc={workflowsBloc}
      condition={(previous: WorkflowState, current: WorkflowState) => {
        if (current instanceof WorkflowUpdateState) {
          console.log("Token: ", token);
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
            <WorkflowsActive workflows={state.workflows} bloc={workflowsBloc} />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  workflows: Workflow[];
  bloc: WorkflowBloc;
};

const WorkflowsActive: FC<Props> = (props) => {
  const { navigate } = useNavigation();
  const { fonts } = useTheme();

  const updateWorkflow = (
    workflow: Workflow,
    updatedWorkflow: Partial<Workflow>
  ) => {
    getLocalStorage("@userToken")
      .then((data) => {
        if (data) {
          props.bloc.add(
            new WorkflowUpdateEvent(data, workflow.id, updatedWorkflow)
          );
        }
      })
      .catch((e) => console.log(e));
  };

  const createWorkflow = (workflow: Workflow) => {
    getLocalStorage("@userToken")
      .then((data) => {
        if (data) {
          props.bloc.add(new WorkflowCreateEvent(data, workflow));
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={styles.container}>
      {props.workflows.map((workflow) => (
        <WorkflowItem
          key={workflow.id}
          workflow={workflow}
          update={updateWorkflow}
        />
      ))}
      <TouchableOpacity
        style={styles.createWorkflowButton}
        onPress={() =>
          navigate("WorkflowCreate", {
            screen: "WorkflowCreate",
            params: { callback: createWorkflow },
          })
        }
      >
        <Text style={fonts.main}>Add workflow</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkflowsActiveScreen;
