import React, { FC, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ActionNodeStackParamsList } from "../../../screens/action-node";
import {
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  SafeAreaView,
  Dimensions,
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
import { CustomDropDownPicker } from "../../common/dropdown-picker";

// file deepcode ignore CollectionUpdatedButNeverQueried: no explicit call to actionsTypes
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

type ActionNodeScreenRouteParams = RouteProp<
  ActionNodeStackParamsList,
  "ActionNode"
>;

type ActionNodeProps = {
  route: ActionNodeScreenRouteParams;
};

const ActionNodeScreen: FC<ActionNodeProps> = (props) => {
  const { workflow, updateWorkflow, node } = props.route.params;
  let token = "";
  const credentialBloc = new CredentialBloc(
    new CredentialRepository("http://localhost:8080")
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
    new ServiceRepository("http://localhost:8080")
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
                  const actionsTypes: Map<string, SingletonNode[]> = new Map<
                    string,
                    SingletonNode[]
                  >();
                  serviceState.services.forEach((service) => {
                    const nodes = service.nodes.filter(
                      (node) => node.label === "action"
                    );
                    actionsTypes.set(service.id, nodes);
                  });
                  return (
                    <ActionNode
                      workflow={workflow}
                      updateWorkflow={updateWorkflow}
                      actionsTypes={actionsTypes}
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
  actionsTypes: Map<string, SingletonNode[]>;
  credentials: string[];
  node?: WorkflowNode;
};

const { height } = Dimensions.get("window");

const ActionNode: FC<Props> = (props) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const [nodeName, setNodeName] = useState<string>(
    props.node ? props.node.name : "Action"
  );
  const [nextNode, setNextNode] = useState(props.node?.nextNodes?.[0] || "");
  const [actionNode, setActionNode] = useState<Partial<WorkflowNode>>(
    props.node
      ? props.node
      : {
          id: uuidv4(),
          serviceId: undefined,
          nodeId: undefined,
          name: undefined,
          label: "action",
          parameters: undefined,
          condition: "true",
          nextNodes: [],
        }
  );

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setScreenHeight(contentHeight);
  };
  const scrollEnabled = screenHeight > height - 180;

  const saveNode = () => {
    if (actionNode.nodeId === undefined) {
      NodeServiceAlert();
    } else {
      const newActionNode = {
        ...actionNode,
        name: nodeName,
        nextNodes: [nextNode],
      };
      const index = props.workflow.nodes.findIndex(
        (node) => node.id === actionNode.id
      );
      if (index !== -1) {
        const newWorkflow = props.workflow;
        newWorkflow.nodes[index] = {
          ...newWorkflow.nodes[index],
          ...newActionNode,
        };
        props.updateWorkflow(newWorkflow);
      } else {
        props.updateWorkflow({
          ...props.workflow,
          nodes: [...props.workflow.nodes, newActionNode as WorkflowNode],
        });
      }
    }
  };

  const submitCondition = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const newNode = {
      ...actionNode,
      condition: e.nativeEvent.text,
    };
    setActionNode(newNode);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
      >
        <SectionTitle label={"Action name"} style={{ marginTop: 10 }} />
        <CustomTextInput text={nodeName} setText={setNodeName} />
        <SectionTitle label={"Actions"} style={{ marginTop: 20 }} />
        {Array.from(props.actionsTypes).map(([serviceId, actionsTypeList]) =>
          actionsTypeList.map((actionsType) => (
            <NodeItem
              key={actionsType.id}
              node={actionsType}
              isConnected={props.credentials.includes(serviceId)}
              selected={actionNode.nodeId === actionsType.id}
              serviceId={serviceId}
              setNode={setActionNode}
              currentNode={actionNode}
            />
          ))
        )}
        <SectionTitle label={"Link"} style={{ marginTop: 50 }} />
        <CustomDropDownPicker
          workflow={props.workflow}
          node={props.node}
          nextNode={nextNode}
          setNextNode={setNextNode}
        />
        {actionNode.nodeId !== undefined ? (
          <SectionTitle label={"Parameters"} style={{ marginTop: 50 }} />
        ) : null}
        {Array.from(props.actionsTypes).map(([_, actionTypeList]) => {
          const service = actionTypeList.find((action) => {
            return action.id === actionNode.nodeId;
          });
          if (service?.parametersDef) {
            return Object.entries(service.parametersDef).map(
              ([valueKey, value]) => {
                return (
                  <ParametersItem
                    node={actionNode}
                    setNode={setActionNode}
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
        <SectionTitle label={"Condition"} style={{ marginTop: 50 }} />
        <CustomTextInput
          text={actionNode.condition}
          onSubmitEditing={submitCondition}
        />
        <SaveButton onPress={saveNode} style={{ marginTop: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActionNodeScreen;
