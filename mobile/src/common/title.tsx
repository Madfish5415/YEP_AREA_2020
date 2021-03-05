import React, { FC } from "react";
import { useTheme } from "react-native-paper";
import { Text, StyleSheet, View, StyleProp, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleArea: {
    fontSize: 52,
    marginBottom: -35,
    fontWeight: "bold",
  },
  titleNumber: {
    fontSize: 130,
    fontWeight: "bold",
  },
});

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Title: FC<Props> = (props: Props) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, props.style]}>
      <Text style={[styles.titleArea, { color: colors.primary }]}>AREA</Text>
      <Text style={[styles.titleNumber, { color: colors.primary }]}>51</Text>
    </View>
  );
};
