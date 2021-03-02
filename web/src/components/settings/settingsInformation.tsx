import React, { FC } from "react";
import { makeStyles, Theme, Typography, Grid } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { User } from "@area-common/types";
import SettingsTextInput from "./settingsTextInput";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: 125,
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
  },
  infoTitle: {
    color: white,
    fontSize: 35,
    marginBottom: 20,
    fontWeight: "bold",
  },
  userInfo: {
    marginBottom: 20,
  },
  inputTitle: {
    color: gray.light2,
    fontSize: 25,
  },
}));

type Props = {
  user: User;
  updateUser: (id: string, user: Partial<User>) => void;
};

const SettingsInformation: FC<Props> = (props) => {
  const classes = useStyles();

  const handleNameChange = (newValue: string) => {
    props.updateUser(props.user.id, { username: newValue });
  };

  const handleFirstNameChange = (newValue: string) => {
    props.updateUser(props.user.id, { firstName: newValue });
  };

  const handleLastNameChange = (newValue: string) => {
    props.updateUser(props.user.id, { lastName: newValue });
  };

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.infoTitle}>Information</Typography>
        <div className={classes.userInfo}>
          <Typography className={classes.inputTitle}>Username</Typography>
          <SettingsTextInput
            value={props.user.username}
            onSubmit={handleNameChange}
          />
        </div>
        <div className={classes.userInfo}>
          <Typography className={classes.inputTitle}>First name</Typography>
          <SettingsTextInput
            value={props.user.firstName ? props.user.firstName : ""}
            onSubmit={handleFirstNameChange}
          />
        </div>
        <div className={classes.userInfo}>
          <Typography className={classes.inputTitle}>Last name</Typography>
          <SettingsTextInput
            value={props.user.lastName ? props.user.lastName : ""}
            onSubmit={handleLastNameChange}
          />
        </div>
      </div>
    </>
  );
};

export default SettingsInformation;
