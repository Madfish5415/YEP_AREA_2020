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
import { CircularProgress, makeStyles } from "@material-ui/core";
import { IconTextComponent } from "../components/icon/icon-text";
import {Person, Warning} from "@material-ui/icons";

const styles = makeStyles({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

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
  const classes = styles();

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
};

const ErrorState: FC = () => {
  const classes = styles();

  const text = "An error has occurred";

  return (
    <div className={classes.container}>
      <IconTextComponent icon={Warning} text={text} />
    </div>
  );
};

type GetProps = {
  user: User;
};

const GetState: FC<GetProps> = (props) => {
  const classes = styles();

  const { user } = props;
  const text = `${user.firstName} ${user.lastName}`;

  return (
    <div className={classes.container}>
      <IconTextComponent icon={Person} text={text} />
    </div>
  );
};

export default IndexPage;
