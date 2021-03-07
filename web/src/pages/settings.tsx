import {
  UserBloc,
  UserErrorState,
  UserReadEvent,
  UserReadState,
  UserRepository,
  UserState,
  UserUpdateEvent,
  UserUpdateState,
} from "@area-common/blocs";
import { gray, white } from "@area-common/styles";
import { User } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import { Button, makeStyles, Theme } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import AppBarComponent from "../components/appbar/appbar";
import { DefaultState } from "../components/blocbuilder/default-state";
import { ErrorState } from "../components/blocbuilder/error-state";
import AccountSecurity from "../components/settings/accountSecurity";
import SettingsInformation from "../components/settings/settingsInformation";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: gray.main,
    height: "100%",
    display: "flex",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  settings: {
    marginTop: 25,
    justifyContent: "center",
  },
  bottomGap: {
    marginTop: "35%",
    marginLeft: 125,
  },
  adminButton: {
    backgroundColor: gray.main,
    "&:hover": {
      backgroundColor: gray.light1,
    },
    color: white,
    textTransform: "none",
    width: 200,
  },
  logOutButton: {
    marginTop: 20,
    marginLeft: 125,
    backgroundColor: gray.main,
    "&:hover": {
      backgroundColor: gray.light1,
    },
    color: white,
    textTransform: "none",
    width: 200,
  },
}));

const SettingsPage: FC = () => {
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

  const updateUser = (user: Partial<User>) => {
    userBloc.add(new UserUpdateEvent(token, user));
  };

  return (
    <BlocBuilder
      bloc={userBloc}
      key={uuidv4()}
      condition={(_, current: UserState) => {
        if (current instanceof UserUpdateState) {
          userBloc.add(new UserReadEvent(token));
        }
        return true;
      }}
      builder={(state: UserState) => {
        if (state instanceof UserErrorState) {
          return <ErrorState error={state.error} />;
        }
        if (state instanceof UserReadState) {
          return (
            <Settings
              user={(state as UserReadState).user}
              updateUser={updateUser}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  user: User;
  updateUser: (user: Partial<User>) => void;
};

const Settings: FC<Props> = (props) => {
  const router = useRouter();
  const classes = useStyles();

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    router
      .push("/authentication/signin")
      .then()
      .catch((e) => console.log(e));
  };

  const handleAdminBoard = () => {
    router.push("/admin");
  };

  return (
    <>
      <AppBarComponent />
      <div
        className={classes.content}
        style={{
          backgroundImage: "url(/assets/images/blob8.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "-500px 50px",
          backgroundSize: "100%",
        }}
      >
        <div className={classes.column}>
          <SettingsInformation
            user={props.user}
            updateUser={props.updateUser}
          />
          <div className={classes.bottomGap}>
            {props.user.administrator ? (
              <Button
                className={classes.adminButton}
                onClick={handleAdminBoard}
              >
                Admin board
              </Button>
            ) : null}
          </div>
          <Button className={classes.logOutButton} onClick={handleLogOut}>
            Log out
          </Button>
        </div>
        <div className={classes.column}>
          <AccountSecurity user={props.user} updateUser={props.updateUser} />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
