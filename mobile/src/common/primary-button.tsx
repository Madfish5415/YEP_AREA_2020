import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { primary } from "@area-common/styles";

const styles = StyleSheet.create({
  signInContainer: {
    width: "100%",
  },
  signInButton: {
    backgroundColor: primary.main,
    height: 30,
    marginHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

type Props = {
  label: string;
  submitFunction: () => void;
};

export const PrimaryButton: FC<Props> = (props: Props) => {
  const { fonts } = useTheme();

  return (
    <View style={styles.signInContainer}>
      <TouchableOpacity
        onPress={props.submitFunction}
        style={styles.signInButton}
      >
        <Text style={fonts.buttonLabel}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  );
};
