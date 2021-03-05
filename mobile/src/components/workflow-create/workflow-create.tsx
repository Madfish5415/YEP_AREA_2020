import React, { FC, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { WorkflowCreateStackParamsList } from "../../screens/workflow-create";
import { Text, useTheme } from "react-native-paper";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { User, Workflow } from "@area-common/types";
import { primary } from "@area-common/styles";
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

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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

type WorkflowCreateRouteParams = RouteProp<
  WorkflowCreateStackParamsList,
  "WorkflowCreate"
>;

type WorkflowCreateProps = {
  route: WorkflowCreateRouteParams;
};

const WorkflowCreateScreen: FC<WorkflowCreateProps> = (props) => {
  const userBloc = new UserBloc(new UserRepository("http://localhost:8080"));
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
  const { fonts } = useTheme();
  const { navigate } = useNavigation();
  const [workflow, setWorkflow] = useState<Workflow>({
    userId: props.user.id,
    id: uuid(),
    name: "Workflow 1",
    description: "No description",
    active: false,
    nodes: [
      {
        id: "1",
        name: "twitter",
        serviceId: "twitter",
        nodeId: "tweet-action",
        label: "action",
        parameters: {
          username: "MrSquaare",
        },
        condition: "true",
        nextNodes: ["2"],
      },
      {
        id: "2",
        name: "contains",
        serviceId: "conditions",
        label: "condition",
        nodeId: "contains",
        parameters: {
          value1: "${text}",
          value2: "AREA 51",
        },
        condition: "true",
        nextNodes: ["3"],
      },
      {
        id: "3",
        name: "not",
        serviceId: "conditions",
        label: "condition",
        nodeId: "not",
        parameters: {
          value: "${result}",
        },
        condition: "true",
        nextNodes: ["4"],
      },
      {
        id: "4",
        name: "twitter",
        label: "reaction",
        serviceId: "twitter",
        nodeId: "tweet-reaction",
        parameters: {
          content: "AREA 51: ${text}",
        },
        condition: "${result}",
        nextNodes: [],
      },
    ],
    starters: [],
  });

  const onContentSizeChange = (contentWidth, contentHeight) => {
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
      console.log(workflow.id);
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
        <ActionSection workflow={workflow} />
        <SectionTitle label={"Operators"} />
        <OperatorSection workflow={workflow} callback={setWorkflow} />
        <SectionTitle label={"Reactions"} />
        <ReactionSection workflow={workflow} callback={setWorkflow} />
        <TouchableOpacity style={styles.saveButton} onPress={submitWorkflow}>
          <Text style={fonts.main}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkflowCreateScreen;
