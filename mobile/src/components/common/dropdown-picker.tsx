import React, { FC } from "react";
import { Workflow, WorkflowNode } from "@area-common/types";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";
import { gray, white } from "@area-common/styles";

const styles = StyleSheet.create({
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

type Props = {
  workflow: Workflow;
  node?: WorkflowNode;
  nextNode: string;
  setNextNode: (nextNode: string) => void;
};

export const CustomDropDownPicker: FC<Props> = (props) => {
  return props.node ? (
    props.node.nextNodes.length > 0 ? (
      <DropDownPicker
        items={props.workflow.nodes
          .filter((node) => node.id !== props.node?.id)
          .map((node) => {
            return {
              label: node.name,
              value: node.name,
            };
          })}
        containerStyle={styles.dropdownPickerContainer}
        style={styles.dropdownPickerStyle}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        defaultValue={props.nextNode}
        dropDownStyle={styles.dropdownPickerStyle}
        onChangeItem={(item) => props.setNextNode(item.value)}
        labelStyle={styles.dropdownPickerLabel}
      />
    ) : (
      <DropDownPicker
        items={props.workflow.nodes
          .filter((node) => node.id !== props.node?.id)
          .map((node) => {
            return {
              label: node.name,
              value: node.name,
            };
          })}
        containerStyle={styles.dropdownPickerContainer}
        style={styles.dropdownPickerStyle}
        itemStyle={{
          justifyContent: "flex-start",
        }}
        dropDownStyle={styles.dropdownPickerStyle}
        onChangeItem={(item) => props.setNextNode(item.value)}
        labelStyle={styles.dropdownPickerLabel}
      />
    )
  ) : (
    <DropDownPicker
      items={props.workflow.nodes
        .filter((node) => node.id !== props.node?.id)
        .map((node) => {
          return {
            label: node.name,
            value: node.name,
          };
        })}
      containerStyle={styles.dropdownPickerContainer}
      style={styles.dropdownPickerStyle}
      itemStyle={{
        justifyContent: "flex-start",
      }}
      dropDownStyle={styles.dropdownPickerStyle}
      onChangeItem={(item) => props.setNextNode(item.value)}
      labelStyle={styles.dropdownPickerLabel}
    />
  );
};
