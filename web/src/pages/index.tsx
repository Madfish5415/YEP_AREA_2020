import React, { FC } from "react";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  UserBloc,
  UserErrorState,
  UserGetEvent,
  UserGetState,
  UserRepository,
} from "@area-common/blocs";
import { ErrorComponent, UserComponent } from "@area-common/components";
import { User } from "@area-common/types";
import { Row, Spin } from "antd";

const IndexPage: FC = () => {
  const bloc = new UserBloc(new UserRepository("http://localhost:8080"));

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
    <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
      <Spin size="large" />
    </Row>
  );
};

const ErrorState: FC = () => {
  return (
    <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
      <ErrorComponent message={"Unexpected error"} />
    </Row>
  );
};

type GetProps = {
  user: User;
};

const GetState: FC<GetProps> = (props) => {
  const { user } = props;

  return (
    <Row align={"middle"} justify={"center"} style={{ height: "100%" }}>
      <UserComponent user={user} />
    </Row>
  );
};

export default IndexPage;
