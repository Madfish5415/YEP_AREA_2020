import React, { FC, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ActionNodeStackParamsList } from "../../../screens/action-node";
import {
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { SectionTitle } from "../../common/section-title";
import { CustomTextInput } from "../../common/text-input";
import {
  CredentialBloc,
  CredentialErrorState,
  CredentialListEvent,
  CredentialListState,
  CredentialRepository,
  CredentialState,
  ServiceBloc,
  ServiceErrorState,
  ServiceListEvent,
  ServiceListState,
  ServiceRepository,
  ServiceState,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { ErrorState } from "../../blocbuilder/error-state";
import { DefaultState } from "../../blocbuilder/default-state";
import { SingletonNode, Workflow, WorkflowNode } from "@area-common/types";
import { NodeItem } from "../../common/node-item";
import { getLocalStorage } from "../../../common/localStorage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { SaveButton } from "../../common/save-button";
import { ParametersItem } from "../../common/parameters-item";
import { NodeServiceAlert } from "../../common/node-service-alert";
import { gray, white } from "@area-common/styles";

// file deepcode ignore CollectionUpdatedButNeverQueried: no explicit call to reactionsTypes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  dropdownPickerContainer: {
    width: "90%",
    height: 30,
  },
  dropdownPickerStyle: {
    borderColor: gray.light1,
    backgroundColor: gray.light1,
    color: white,
  },
  dropdownPickerLabel: {
    color: gray.light3,
  },
});

type ActionNodeScreenRouteParams = RouteProp<
  ActionNodeStackParamsList,
  "ActionNode"
>;

type ActionNodeProps = {
  route: ActionNodeScreenRouteParams;
};

const ReactionNodeScreen: FC<ActionNodeProps> = (props) => {
  const { workflow, updateWorkflow, node } = props.route.params;
  let token = "";
  const credentialBloc = new CredentialBloc(
    new CredentialRepository(globalThis.serverURL)
  );
  getLocalStorage("@userToken")
    .then((data) => {
      if (data) {
        token = data;
        credentialBloc.add(new CredentialListEvent(data));
      }
    })
    .catch((e) => console.log(e));
  credentialBloc.add(new CredentialListEvent(token));

  const serviceBloc = new ServiceBloc(
    new ServiceRepository(globalThis.serverURL)
  );
  serviceBloc.add(new ServiceListEvent());

  return (
    <BlocBuilder
      bloc={credentialBloc}
      builder={(credentialState: CredentialState) => {
        if (credentialState instanceof CredentialErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (credentialState instanceof CredentialListState) {
          return (
            <BlocBuilder
              bloc={serviceBloc}
              builder={(serviceState: ServiceState) => {
                if (serviceState instanceof ServiceErrorState) {
                  return <ErrorState errorLabel={"An error has occured"} />;
                }
                if (serviceState instanceof ServiceListState) {
                  const reactionTypes: Map<string, SingletonNode[]> = new Map<
                    string,
                    SingletonNode[]
                  >();
                  serviceState.services.forEach((service) => {
                    const nodes = service.nodes.filter(
                      (node) => node.label === "reaction"
                    );
                    reactionTypes.set(service.id, nodes);
                  });
                  return (
                    <ReactionNode
                      workflow={workflow}
                      updateWorkflow={updateWorkflow}
                      reactionTypes={reactionTypes}
                      credentials={credentialState.credentials}
                      node={node}
                    />
                  );
                }
                return <DefaultState />;
              }}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  workflow: Workflow;
  updateWorkflow: (workflow: Workflow) => void;
  reactionTypes: Map<string, SingletonNode[]>;
  credentials: string[];
  node?: WorkflowNode;
};

const ReactionNode: FC<Props> = (props) => {
  const [nodeName, setNodeName] = useState<string>(
    props.node ? props.node.name : "Reaction"
  );
  const [reactionNode, setReactionNode] = useState<Partial<WorkflowNode>>(
    props.node
      ? props.node
      : {
          id: uuidv4(),
          serviceId: undefined,
          nodeId: undefined,
          name: undefined,
          label: "reaction",
          parameters: undefined,
          condition: "true",
          nextNodes: [],
        }
  );

  const saveNode = () => {
    if (reactionNode.nodeId === undefined) {
      NodeServiceAlert();
    } else {
      const newReactionNode = {
        ...reactionNode,
        name: nodeName,
      };
      const index = props.workflow.nodes.findIndex(
        (node) => node.id === reactionNode.id
      );
      if (index !== -1) {
        const newWorkflow = props.workflow;
        newWorkflow.nodes[index] = {
          ...newWorkflow.nodes[index],
          ...newReactionNode,
        };
        props.updateWorkflow(newWorkflow);
      } else {
        props.updateWorkflow({
          ...props.workflow,
          nodes: [...props.workflow.nodes, newReactionNode as WorkflowNode],
        });
      }
    }
  };

  const submitCondition = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const newNode = {
      ...reactionNode,
      condition: e.nativeEvent.text,
    };
    setReactionNode(newNode);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionTitle label={"Reaction's name"} style={{ marginTop: 10 }} />
      <CustomTextInput text={nodeName} setText={setNodeName} />
      <SectionTitle label={"Reactions"} style={{ marginTop: 20 }} />
      {Array.from(props.reactionTypes).map(([serviceId, reactionTypesList]) =>
        reactionTypesList.map((reactionsType) => (
          <NodeItem
            key={reactionsType.id}
            node={reactionsType}
            isConnected={props.credentials.includes(serviceId)}
            selected={reactionNode.nodeId === reactionsType.id}
            serviceId={serviceId}
            setNode={setReactionNode}
            currentNode={reactionNode}
          />
        ))
      )}
      {reactionNode.nodeId !== undefined ? (
        <SectionTitle label={"Parameters"} style={{ marginTop: 30 }} />
      ) : null}
      {Array.from(props.reactionTypes).map(([_, reactionTypesList]) => {
        const service = reactionTypesList.find((reaction) => {
          return reaction.id === reactionNode.nodeId;
        });
        if (service?.parametersDef) {
          return Object.entries(service.parametersDef).map(
            ([valueKey, value]) => {
              return (
                <ParametersItem
                  node={reactionNode}
                  setNode={setReactionNode}
                  key={valueKey}
                  valueKey={valueKey}
                  variable={value}
                />
              );
            }
          );
        } else {
          return null;
        }
      })}
      <SectionTitle label={"Condition"} style={{ marginTop: 30 }} />
      <CustomTextInput
        text={reactionNode.condition}
        onSubmitEditing={submitCondition}
      />
      <SaveButton onPress={saveNode} style={{ marginTop: 20 }} />
    </ScrollView>
  );
};

export default ReactionNodeScreen;
