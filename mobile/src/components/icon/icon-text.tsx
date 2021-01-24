import { StyleSheet, View } from "react-native";
import { Avatar, Paragraph } from "react-native-paper";
import React, { FC } from "react";
import { red } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: red[500],
  },
  text: {
    fontSize: 16,
  },
});

type Props = {
  icon: string;
  text: string;
};

export const IconTextComponent: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Avatar.Icon icon={props.icon} size={64} style={styles.avatar} />
      <Paragraph style={styles.text}>{props.text}</Paragraph>
    </View>
  );
};
