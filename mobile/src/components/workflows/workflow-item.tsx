import React, { FC, useState } from "react";

import { View, StyleSheet, Switch } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { gray } from "@area-common/styles";
import { Workflow } from "@area-common/types";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    borderBottomColor: gray.light1,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});

type Props = {
  label: string;
  isActive: boolean;
};

export const WorkflowItem: FC<Props> = (props) => {
  const [toggle, setToggle] = useState(props.isActive);
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: colors.primary }}
        style={styles.switch}
        onValueChange={setToggle}
        value={toggle}
      />
    </View>
  );
};
