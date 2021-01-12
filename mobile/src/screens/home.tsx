import React, { FC } from "react";
import { Text, View } from "react-native";
import {
  UserBloc,
  UserErrorState,
  UserGetEvent,
  UserGetState,
  UserRepository,
} from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { User } from "@area-common/types";

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
  return <Text>Loading...</Text>;
};

const ErrorState: FC = () => {
  return <Text>An error occurred</Text>;
};

type GetProps = {
  user: User;
};

const GetState: FC<GetProps> = (props) => {
  const { user } = props;

  return (
    <View>
      <Text>First name: {user.firstName}</Text>
      <Text>Last name: {user.lastName}</Text>
    </View>
  );
};

export default HomeScreen;
