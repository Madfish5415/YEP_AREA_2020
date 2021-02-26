import React, { FC } from "react";
import { Text, View } from "react-native";
import { EpitechCredentialsStackParamList } from "../../screens/epitech-credentials";
import { RouteProp } from "@react-navigation/native";

type EpitechCredentialsRootProps = RouteProp<
  EpitechCredentialsStackParamList,
  "EpitechCredentials"
>;

type Props = {
  route: EpitechCredentialsRootProps;
};

const EpitechCredentialsScreen: FC<Props> = (props) => {
  return (
    <View>
      <Text>{props.route.params.userId}</Text>
      <Text>Matt fdp</Text>
    </View>
  );
};

export default EpitechCredentialsScreen;
