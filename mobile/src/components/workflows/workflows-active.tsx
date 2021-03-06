import React, { FC, useState } from "react";
import { WorkflowItem } from "./workflow-item";
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
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
    alignItems: "center",
    paddingBottom: 20,
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
  let token = "";
  const workflowsBloc = new WorkflowBloc(
    new WorkflowRepository("http://localhost:8080")
  );
  useIsFocused();
  getLocalStorage("@userToken")
    .then((data) => {
      if (data) {
        token = data;
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
              bloc={workflowsBloc}
              token={token}
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
  bloc: WorkflowBloc;
  token: string;
};

const { height } = Dimensions.get("window");

const WorkflowsActive: FC<Props> = (props) => {
  const { navigate } = useNavigation();
  const { fonts } = useTheme();
  const [screenHeight, setScreenHeight] = useState(0);

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setScreenHeight(contentHeight);
  };

  const scrollEnabled = screenHeight > height - 180;

  const updateWorkflow = (
    workflow: Workflow,
    updatedWorkflow: Partial<Workflow>
  ) => {
    props.bloc.add(
      new WorkflowUpdateEvent(props.token, workflow.id, updatedWorkflow)
    );
  };

  const createWorkflow = (workflow: Workflow) => {
    props.bloc.add(new WorkflowCreateEvent(props.token, workflow));
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
      >
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkflowsActiveScreen;
