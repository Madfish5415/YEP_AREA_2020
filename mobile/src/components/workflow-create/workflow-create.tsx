import React, { FC, useState } from "react";
import {
  RouteProp,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import { WorkflowCreateStackParamsList } from "../../screens/workflow-create";
import { SafeAreaView, ScrollView, StyleSheet, Dimensions } from "react-native";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { User, Workflow } from "@area-common/types";
import { ActionSection } from "../workflow/action/action-section";
import { OperatorSection } from "../workflow/operator/operator-section";
import { ReactionSection } from "../workflow/reaction/reaction-section";
import {
  UserBloc,
  UserErrorState,
  UserReadEvent,
  UserReadState,
  UserRepository,
} from "@area-common/blocs";
import { getLocalStorage } from "../../common/localStorage";
import { BlocBuilder } from "@felangel/react-bloc";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { v4 as uuid } from "uuid";
import { SaveAlert } from "../common/save-alert";
import { ErrorAlert } from "../common/error-alert";
import { SaveButton } from "../common/save-button";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

type WorkflowCreateRouteParams = RouteProp<
  WorkflowCreateStackParamsList,
  "WorkflowCreate"
>;

type WorkflowCreateProps = {
  route: WorkflowCreateRouteParams;
};

const WorkflowCreateScreen: FC<WorkflowCreateProps> = (props) => {
  const userBloc = new UserBloc(new UserRepository(globalThis.serverURL));
  const { navigate } = useNavigation();
  getLocalStorage("@userToken")
    .then((data) => {
      if (data) {
        userBloc.add(new UserReadEvent(data));
      } else {
        navigate("SignIn");
      }
    })
    .catch((e) => console.log(e));

  return (
    <BlocBuilder
      bloc={userBloc}
      builder={(state) => {
        if (state instanceof UserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof UserReadState) {
          return (
            <WorkflowCreate
              user={state.user}
              callback={props.route.params.callback}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  user: User;
  callback: (workflow: Workflow) => void;
};

const { height } = Dimensions.get("window");

const WorkflowCreate: FC<Props> = (props) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const { navigate } = useNavigation();
  useIsFocused();
  const [workflow, setWorkflow] = useState<Workflow>({
    userId: props.user.id,
    id: uuid(),
    name: "Workflow 1",
    description: "No description",
    active: false,
    nodes: [],
    starters: [],
  });

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setScreenHeight(contentHeight);
  };

  const scrollEnabled = screenHeight > height;

  const updateName = (text: string) => {
    setWorkflow({ ...workflow, name: text });
  };

  const submitWorkflow = () => {
    const actionsWorkflow = workflow.nodes.filter(
      (node) => node.label === "action"
    );
    const reactionsWorkflow = workflow.nodes.filter(
      (node) => node.label === "reaction"
    );
    if (actionsWorkflow.length > 0 && reactionsWorkflow.length > 0) {
      props.callback(workflow);
      SaveAlert("create");
      navigate("Home", { screen: "Workflows" });
    } else {
      ErrorAlert();
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
      >
        <SectionTitle label={"Workflow's name"} style={{ marginTop: 10 }} />
        <CustomTextInput text={workflow.name} setText={updateName} />
        <SectionTitle label={"Actions"} style={{ marginTop: 20 }} />
        <ActionSection workflow={workflow} callback={setWorkflow} />
        <SectionTitle label={"Operators"} />
        <OperatorSection workflow={workflow} callback={setWorkflow} />
        <SectionTitle label={"Reactions"} />
        <ReactionSection workflow={workflow} callback={setWorkflow} />
        <SaveButton onPress={submitWorkflow} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkflowCreateScreen;
