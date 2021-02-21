import React, { FC } from "react";
import { RouteProp } from "@react-navigation/native";
import { ActionNodeStackParamsList } from "../../../screens/action-node";
import { View, StyleSheet } from "react-native";
import { SectionTitle } from "../../common/section-title";
import { gray, primary } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    height: 25,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: gray.light1,
    color: primary.main,
  },
});

type ActionNodeScreenRouteParams = RouteProp<
  ActionNodeStackParamsList,
  "ActionNode"
>;

type Props = {
  route: ActionNodeScreenRouteParams;
};

export const ActionNodeScreen: FC<Props> = (props) => {
  const { workflow, updateActionCallback } = props.route.params;

  return (
    <View style={styles.container}>
      <SectionTitle label={"Nodes"} style={{ marginTop: 5 }} />
    </View>
  );
};
