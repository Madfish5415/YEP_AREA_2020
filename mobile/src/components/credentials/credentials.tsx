import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import Service from "./service";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { primary } from "@area-common/styles";
import {
  UserBloc,
  UserErrorState,
  UserGetEvent,
  UserGetState,
  UserRepository,
  UserState,
  UserEvent,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { DefaultState } from "../blocbuilder/default-state";
import { ErrorState } from "../blocbuilder/error-state";
import { RouteProp } from "@react-navigation/native";
import { CredentialsStackParamsList } from "../../pages/credentials";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#262C40",
    marginTop: 10,
  },
  text: {
    fontSize: 50,
    color: primary.main,
    fontWeight: "bold",
  },
});

type CredentialsRootProps = RouteProp<
  CredentialsStackParamsList,
  "Credentials"
>;

type CredentialsProps = {
  route: CredentialsRootProps;
};

const CredentialsScreen: FC<CredentialsProps> = (props) => {
  const userBloc = new UserBloc(new UserRepository(""));
  //userBloc.add(new UserGetEvent());

  //return (
  // <Credentials/>)
  return <Credentials userId={props.route.params.userId} />;
};

type Props = {
  userId: string;
};

const Credentials: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Service
        name={"Instagram"}
        icon={<FontAwesome size={50} name={"instagram"} color={primary.main} />}
        isEpitech={false}
        userId={props.userId}
      />
      <Service
        name={"Office 365"}
        icon={
          <MaterialCommunityIcons
            size={50}
            name={"microsoft-office"}
            color={primary.main}
          />
        }
        isEpitech={false}
        userId={props.userId}
      />
      <Service
        name={"Github"}
        icon={<FontAwesome size={50} name={"github"} color={primary.main} />}
        isEpitech={false}
        userId={props.userId}
      />
      <Service
        name={"Discord"}
        icon={<Fontisto size={50} name={"discord"} color={primary.main} />}
        isEpitech={false}
        userId={props.userId}
      />
      <Service
        name={"Youtube"}
        icon={
          <FontAwesome size={50} name={"youtube-play"} color={primary.main} />
        }
        isEpitech={false}
        userId={props.userId}
      />
      <Service
        name={"Epitech"}
        icon={<Text style={styles.text}>E</Text>}
        isEpitech={true}
        userId={props.userId}
      />
    </View>
  );
};

export default CredentialsScreen;
