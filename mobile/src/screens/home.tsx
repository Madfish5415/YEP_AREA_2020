import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import {
  UserBloc,
  UserErrorState,
  UserGetEvent,
  UserGetState,
  UserRepository,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { User } from "@area-common/types";
import { IconTextComponent } from "../components/icon/icon-text";
import {ActivityIndicator} from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const HomeScreen: FC = () => {
  const bloc = new UserBloc(new UserRepository("http://localhost:1234"));

  bloc.add(new UserGetEvent("1"));

  return (
    <BlocBuilder
      bloc={bloc}
      builder={(state) => {
        if (state instanceof UserErrorState) {
          return <ErrorState />;
        }

        if (state instanceof UserGetState) {
          return <GetState user={state.user} />;
        }

        return <DefaultState />;
      }}
    />
  );
};

const DefaultState: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size={"large"} />
    </View>
  );
};

const ErrorState: FC = () => {
  const text = "An error has occurred";

  return (
    <View style={styles.container}>
      <IconTextComponent icon={"alert"} text={text} />
    </View>
  );
};

type GetProps = {
  user: User;
};

const GetState: FC<GetProps> = (props) => {
  const { user } = props;
  const text = `${user.firstName} ${user.lastName}`;

  return (
    <View style={styles.container}>
      <IconTextComponent icon={"account"} text={text} />
    </View>
  );
};

export default HomeScreen;
