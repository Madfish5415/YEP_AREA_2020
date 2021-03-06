import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { gray } from "@area-common/styles";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  signInButton: {
    backgroundColor: gray.light1,
    height: 30,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

type Props = {
  style?: StyleProp<ViewStyle>;
  externalServiceName: string;
  externalServiceColor: string;
  externalServiceIcon: React.ReactElement<any>;
  submitFunction: () => void;
};

export const ExternalSignInButton: FC<Props> = (props: Props) => {
  const { fonts } = useTheme();

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={props.submitFunction}
        style={styles.signInButton}
      >
        <View style={{ flexGrow: 1 }}>{props.externalServiceIcon}</View>
        <View style={{ flexGrow: 1, flexDirection: "row" }}>
          <Text style={fonts.buttonLabel}>Connect with </Text>
          <Text
            style={[fonts.buttonLabel, { color: props.externalServiceColor }]}
          >
            {props.externalServiceName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
