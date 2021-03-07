import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { primary } from "@area-common/styles";

const styles = StyleSheet.create({
  saveButton: {
    marginTop: 10,
    width: 250,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primary.main,
    borderRadius: 20,
  },
});

type Props = {
  onPress: any;
  style?: StyleProp<ViewStyle>;
};

export const SaveButton: FC<Props> = (props) => {
  const { fonts } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.saveButton, props.style]}
      onPress={props.onPress}
    >
      <Text style={fonts.main}>Save</Text>
    </TouchableOpacity>
  );
};
