import React, { FC, useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SingletonNode, WorkflowNode } from "@area-common/types";
import { gray, primary } from "@area-common/styles";
import { Text } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-end",
  },
  touchableOpacityContainer: {
    width: "100%",
    paddingHorizontal: 15,
    minHeight: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nodeInformationContainer: {
    width: "80%",
    justifyContent: "space-between",
  },
  nodeName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nodeDescription: {
    fontSize: 12,
    color: gray.light3,
  },
  divider: {
    width: "96%",
    paddingLeft: 15,
    height: 1,
    backgroundColor: gray.light1,
  },
});

type Props = {
  node: SingletonNode;
  isConnected: boolean;
  selected: boolean;
  serviceId: string;
  setNode: (node: WorkflowNode) => void;
  currentNode: Partial<WorkflowNode>;
};

export const NodeItem: FC<Props> = (props) => {
  const [selected, setSelected] = useState(props.selected);

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  const updateNode = () => {
    setSelected(true);
    props.setNode({
      ...props.currentNode,
      nodeId: props.node.id,
      serviceId: props.serviceId,
    } as WorkflowNode);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableOpacityContainer}
        disabled={!props.isConnected}
        onPress={updateNode}
      >
        <View style={styles.nodeInformationContainer}>
          <Text style={styles.nodeName}>{props.node.name}</Text>
          <Text style={styles.nodeDescription}>{props.node.description}</Text>
        </View>
        {!props.isConnected ? (
          <Fontisto name="locked" size={20} color={gray.light2} />
        ) : props.isConnected && selected ? (
          <Feather name="check" size={24} color={primary.main} />
        ) : null}
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};
