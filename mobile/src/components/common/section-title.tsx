import React, { FC } from "react";
import { Text, StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { gray } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    height: 25,
    paddingHorizontal: 15,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: gray.light2,
  },
  label: {
    color: gray.light2,
  },
});

type Props = {
  style?: StyleProp<ViewStyle>;
  label: string;
};

export const SectionTitle: FC<Props> = (props: Props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </View>
  );
};
