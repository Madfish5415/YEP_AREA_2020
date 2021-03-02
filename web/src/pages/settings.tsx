import React, { FC } from "react";
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
import SettingsInformation from "../components/settings/settingsInformation";
import AccountSecurity from "../components/settings/accountSecurity";
import { User } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import { v4 as uuidv4 } from "uuid";

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
  logOutButton: {
    marginTop: 140,
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
  const userBloc = new UserBloc(new UserRepository(""));
  userBloc.add(new UserReadEvent("3dcf9a69-e258-4449-a41d-cea7f6ca3fa9"));

  const updateUser = (id: string, user: Partial<User>) => {
    userBloc.add(new UserUpdateEvent(id, user));
  };

  return (
    <BlocBuilder
      bloc={userBloc}
      key={uuidv4()}
      condition={(_, current: UserState) => {
        if (current instanceof UserUpdateState) {
          userBloc.add(
            new UserReadEvent("3dcf9a69-e258-4449-a41d-cea7f6ca3fa9")
          );
        }
        return true;
      }}
      builder={(state: UserState) => {
        if (state instanceof UserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
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
  updateUser: (id: string, user: Partial<User>) => void;
};

const Settings: FC<Props> = (props) => {
  const classes = useStyles();

  const handleLogOut = () => {
    console.log("User logged out");
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
