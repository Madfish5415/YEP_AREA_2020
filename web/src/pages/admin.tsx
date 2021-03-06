import React, { FC, useEffect } from "react";
import AppBarComponent from "../components/appbar/appbar";
import { makeStyles, Theme, Typography, Grid, Button } from "@material-ui/core";
import {
  UserBloc,
  UserRepository,
  UserState,
  UserReadEvent,
  UserReadState,
  UserUpdateState,
  UserUpdateEvent,
  UserErrorState,
} from "@area-common/blocs";
import { gray, white } from "@area-common/styles";
import { DefaultState } from "../components/blocbuilder/default-state";
import { ErrorState } from "../components/blocbuilder/error-state";
import { User } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import UserList from "../components/admin/userList";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: gray.main,
    height: "100%",
    marginLeft: 125,
    marginTop: 40,
  },
  userTitle: {
    color: gray.light2,
    fontSize: 30,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
}));

const AdminPage: FC = () => {
  const router = useRouter();
  let token = "";
  const userBloc = new UserBloc(new UserRepository("http://localhost:8080"));
  useEffect(() => {
    const tmp = localStorage.getItem("jwt");
    if (!tmp) {
      router
        .push("/authentication/signin")
        .then()
        .catch((e) => console.log(e));
    } else {
      token = tmp;
      userBloc.add(new UserReadEvent(token));
    }
  });

  return (
    <BlocBuilder
      bloc={userBloc}
      key={uuidv4()}
      builder={(state: UserState) => {
        if (state instanceof UserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof UserReadState) {
          return <Admin user={(state as UserReadState).user} />;
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  user: User;
};

const Admin: FC<Props> = (props) => {
  const classes = useStyles();
  const router = useRouter();

  if (props.user.administrator === false) {
    router.push("/settings");
  }

  return (
    <>
      <AppBarComponent />
      <div className={classes.content}>
        <Typography className={classes.userTitle}>Users</Typography>
        <UserList user={props.user} />
      </div>
    </>
  );
};

export default AdminPage;
