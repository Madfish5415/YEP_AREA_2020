import React, { FC, useState } from "react";
import { RouteProp } from "@react-navigation/native";
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
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { SaveButton } from "../../common/save-button";
import { ParametersItem } from "../../common/parameters-item";
import { NodeServiceAlert } from "../../common/node-service-alert";
import { gray, white } from "@area-common/styles";
import { OperatorNodeStackParamsList } from "../../../screens/operator-node";
import { CustomDropDownPicker } from "../../common/dropdown-picker";

// file deepcode ignore CollectionUpdatedButNeverQueried: no explicit call to operatorsTypes

const styles = StyleSheet.create({
  container: {
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
  OperatorNodeStackParamsList,
  "OperatorNode"
>;

type OperatorNodeProps = {
  route: ActionNodeScreenRouteParams;
};

const OperatorNodeScreen: FC<OperatorNodeProps> = (props) => {
  const { workflow, updateWorkflow, node } = props.route.params;

  const serviceBloc = new ServiceBloc(
    new ServiceRepository(globalThis.serverURL)
  );
  serviceBloc.add(new ServiceListEvent());

  return (
    <BlocBuilder
      bloc={serviceBloc}
      builder={(serviceState: ServiceState) => {
        if (serviceState instanceof ServiceErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (serviceState instanceof ServiceListState) {
          const operatorsTypes: Map<string, SingletonNode[]> = new Map<
            string,
            SingletonNode[]
          >();
          serviceState.services.forEach((service) => {
            if (service.id === "conditions") {
              operatorsTypes.set(service.id, service.nodes);
            }
          });
          return (
            <OperatorNode
              workflow={workflow}
              updateWorkflow={updateWorkflow}
              operatorsTypes={operatorsTypes}
              node={node}
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
  operatorsTypes: Map<string, SingletonNode[]>;
  node?: WorkflowNode;
};

const { height } = Dimensions.get("window");

const OperatorNode: FC<Props> = (props) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const [nodeName, setNodeName] = useState<string>(
    props.node ? props.node.name : "Operator"
  );
  const [nextNode, setNextNode] = useState(
    props.node !== undefined
      ? props.node.nextNodes.length > 0
        ? (props.workflow.nodes.find(
            (node) => node.id === props.node?.nextNodes[0]
          )?.name as string)
        : ""
      : ""
  );
  const [operatorNode, setOperatorNode] = useState<Partial<WorkflowNode>>(
    props.node
      ? props.node
      : {
          id: uuidv4(),
          serviceId: undefined,
          nodeId: undefined,
          name: undefined,
          label: "condition",
          parameters: {},
          condition: "true",
          nextNodes: [],
        }
  );

  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setScreenHeight(contentHeight);
  };
  const scrollEnabled = screenHeight > height - 180;

  const saveNode = () => {
    if (operatorNode.nodeId === undefined) {
      NodeServiceAlert();
    } else {
      let newOperatorNode = {
        ...operatorNode,
        name: nodeName,
      };
      if (nextNode !== "") {
        const nextNodeId = props.workflow.nodes.find(
          (node) => node.name === nextNode
        )?.id as string;
        newOperatorNode = {
          ...newOperatorNode,
          nextNodes: [nextNodeId],
        };
      }
      const index = props.workflow.nodes.findIndex(
        (node) => node.id === operatorNode.id
      );
      if (index !== -1) {
        const newWorkflow = props.workflow;
        newWorkflow.nodes[index] = {
          ...newWorkflow.nodes[index],
          ...newOperatorNode,
        };
        props.updateWorkflow(newWorkflow);
      } else {
        props.updateWorkflow({
          ...props.workflow,
          nodes: [...props.workflow.nodes, newOperatorNode as WorkflowNode],
        });
      }
    }
  };

  const submitCondition = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    const newNode = {
      ...operatorNode,
      condition: e.nativeEvent.text,
    };
    setOperatorNode(newNode);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={scrollEnabled}
        onContentSizeChange={onContentSizeChange}
      >
        <SectionTitle label={"Operator's name"} style={{ marginTop: 10 }} />
        <CustomTextInput text={nodeName} setText={setNodeName} />
        <SectionTitle label={"Operators"} style={{ marginTop: 20 }} />
        {Array.from(
          props.operatorsTypes
        ).map(([serviceId, operatorsTypeList]) =>
          operatorsTypeList.map((operatorsType) => (
            <NodeItem
              key={operatorsType.id}
              node={operatorsType}
              isConnected={true}
              selected={operatorNode.nodeId === operatorsType.id}
              serviceId={serviceId}
              setNode={setOperatorNode}
              currentNode={operatorNode}
            />
          ))
        )}
        <SectionTitle label={"Link"} style={{ marginTop: 30 }} />
        <CustomDropDownPicker
          workflow={props.workflow}
          nextNode={nextNode}
          setNextNode={setNextNode}
        />
        {operatorNode.nodeId !== undefined ? (
          <SectionTitle label={"Parameters"} style={{ marginTop: 30 }} />
        ) : null}
        {Array.from(props.operatorsTypes).map(([_, operatorsTypeList]) => {
          const service = operatorsTypeList.find((operator) => {
            return operator.id === operatorNode.nodeId;
          });
          if (service?.parametersDef) {
            return Object.entries(service.parametersDef).map(
              ([valueKey, value]) => {
                return (
                  <ParametersItem
                    node={operatorNode}
                    setNode={setOperatorNode}
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
          text={operatorNode.condition}
          onSubmitEditing={submitCondition}
        />
        <SaveButton onPress={saveNode} style={{ marginTop: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OperatorNodeScreen;
