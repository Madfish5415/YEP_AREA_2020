import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { BlocBuilder } from "@felangel/react-bloc";
import { RouteProp } from "@react-navigation/native";
import { WorkflowStackParamsList } from "../../screens/workflow";
import {
  WorkflowBloc,
  WorkflowErrorState,
  WorkflowReadEvent,
  WorkflowReadState,
  WorkflowRepository,
  WorkflowState,
} from "@area-common/blocs";
import { ErrorState } from "../blocbuilder/error-state";
import { DefaultState } from "../blocbuilder/default-state";
import { Workflow as WorkflowType } from "@area-common/types";
import { View } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

type WorkflowScreenRouteParams = RouteProp<WorkflowStackParamsList, "Workflow">;

type WorkflowScreenProps = {
  route: WorkflowScreenRouteParams;
};

const WorkflowScreen: FC<WorkflowScreenProps> = (props) => {
  const workflowBloc = new WorkflowBloc(new WorkflowRepository(""));
  workflowBloc.add(new WorkflowReadEvent(props.route.params.workflow.id));

  return (
    <BlocBuilder
      bloc={workflowBloc}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowReadState) {
          return <Workflow workflow={state.workflow} />;
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  workflow: WorkflowType;
};

const Workflow: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.workflow.name}</Text>
    </View>
  );
};

export default WorkflowScreen;
