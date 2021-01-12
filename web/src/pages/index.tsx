import React, { FC } from "react";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  UserBloc,
  UserErrorState,
  UserGetEvent,
  UserGetState,
  UserRepository,
} from "@area-common/blocs";
import { User } from "@area-common/types";

const IndexPage: FC = () => {
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
  return <p>Loading...</p>;
};

const ErrorState: FC = () => {
  return <p>An error occurred</p>;
};

type GetProps = {
  user: User;
};

const GetState: FC<GetProps> = (props) => {
  const { user } = props;

  return (
    <div>
      <p>First name: {user.firstName}</p>
      <p>Last name: {user.lastName}</p>
    </div>
  );
};

export default IndexPage;
