import React, { FC } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { Workflow } from "@area-common/types";
import { gray } from "@area-common/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    borderBottomColor: gray.light1,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  delete: {
    borderRadius: 20 / 2,
    marginRight: 10,
  },
});

type Props = {
  workflow: Workflow;
};

export const EditWorkflowItem: FC<Props> = (props) => {
  const { colors } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={() => alert("Todo !")}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.delete} onPress={() => alert("Todo !")}>
          <Icon name="ios-remove-circle" size={23} color={colors.primary} />
        </TouchableOpacity>
        <Text style={{ flexGrow: 1 }}>Workflow 1</Text>
        <Icon name="ios-chevron-forward" size={23} color={gray.light2} />
      </View>
    </TouchableWithoutFeedback>
  );
};
