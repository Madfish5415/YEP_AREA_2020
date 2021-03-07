import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { gray, primary, white } from "@area-common/styles";
import { Text, useTheme } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderTopColor: gray.light1,
    borderTopWidth: 1,
    borderBottomColor: gray.light1,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

type Props = {
  label: string;
  callback: any;
  important: boolean;
  style?: StyleProp<ViewStyle>;
};

export const StandardButton: FC<Props> = (props) => {
  const { fonts } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.callback}
    >
      <Text style={{ color: props.important ? primary.main : white }}>
        {props.label}
      </Text>
      <Ionicons name="ios-chevron-forward" size={20} color={gray.light1} />
    </TouchableOpacity>
  );
};
